import WebSocket from 'isomorphic-ws'
import { ForeverWebSocket } from 'forever-websocket'
import { createPubSubManager } from './subPubManager.mjs'
import { createMessageSequenceValidator } from './messageSequenceValidator.mjs'
import { unsubscribe } from './unsubscribe.mjs'
import { subscribe } from './subscribe.mjs'
import { uniqueId } from '../utils/uniqueId.mjs'
import { SpotTradingWrapper } from '../rest/spotTradingWrapper.mjs'
import { FuturesTradingWrapper } from '../rest/futuresTradingWrapper.mjs'

export function createWebSocketClient(credentialsToUse, serviceConfig, market) {
  const log = serviceConfig.logger
  const spot = new SpotTradingWrapper(credentialsToUse, serviceConfig)
  const futures = new FuturesTradingWrapper(credentialsToUse, serviceConfig)
  const getConnectTokenFunctions = {
    spot: {
      public: spot.market.getPublicToken,
      private:spot.market.getPrivateToken,
    },
    futures: {
      public: futures.market.getPublicToken,
      private: futures.market.getPrivateToken,
    },
  }

  const getConnectToken = getConnectTokenFunctions[market][credentialsToUse.apiKey ? 'private' : 'public'].bind(spot)

  let webSocket
  let wsInfo = {
    connectId:undefined,
    endpoint: undefined,
    pingTimeOut: undefined,
    pingId: undefined,
    isAvailable: false,
  }

  const subPubManager = createPubSubManager()
  const messageSequenceValidator = createMessageSequenceValidator()

  const createWebSocket = async () => {
    const connectInfo = await getConnectToken()
    const instanceServer = connectInfo.data.instanceServers[0]
    wsInfo.endpoint = instanceServer.endpoint
    wsInfo.connectId = uniqueId()
    wsInfo.timeout = instanceServer.pingInterval + instanceServer.pingTimeout
    wsInfo.pingId = wsInfo.connectId
    webSocket.updateOptions(
      {
        ping: {
          interval: instanceServer.pingInterval,
          data: {
            id: wsInfo.pingId,
            type: 'ping',
          }
        },
        timeout: wsInfo.timeout,
    })
    const wsUrl = `${instanceServer.endpoint}?token=${connectInfo.data.token}&connectId=${wsInfo.connectId}`
    return new WebSocket(wsUrl)
  }

  webSocket = new ForeverWebSocket(
    "",
    undefined,
    {
      automaticOpen: false,
      reconnect: {},
      timeout: 62000,
      ping: {
        interval: 30000,
        data: {
          id: wsInfo.pingId,
          type: 'ping',
        }
      },
      createWebSocket,
    }
  )

  Object.defineProperty(webSocket, 'connectId', {
    get() { return wsInfo.connectId },
    set(value) { log.warn('wsConnectId property is read-only') }
  })

  Object.defineProperty(webSocket, 'isAvailable', {
    get() { return wsInfo.isAvailable },
    set(value) { log.warn('isAvailable property is read-only') }
  })

  // Bind the function to the context
  webSocket.subscribe = subscribe.bind(webSocket, { logger: log, webSocket, subPubManager})
  webSocket.unsubscribe = unsubscribe.bind(webSocket, { logger: log, webSocket, subPubManager})

  webSocket.on('open', ()=> {
    log.info(`WebSocket[${wsInfo.connectId}] connected to ${wsInfo.endpoint}`)
    messageSequenceValidator.reset()
  })

  webSocket.on('message', (message)=> {
    const data = JSON.parse(message)

    if (data.type === 'pong' && data.id === wsInfo.pingId ) {
      log.debug(`WebSocket[${wsInfo.connectId}] pong`)
      webSocket.emit('pong', data)
      return
    }

    if (data.type === 'welcome' && data.id === wsInfo.connectId) {
      log.debug(`WebSocket[${wsInfo.connectId}] available`)
      wsInfo.isAvailable = true
      webSocket.emit('available', data)
      return
    }

    if (data.type === 'error') {
      log.error(`WebSocket[${wsInfo.connectId}] error:\n${JSON.stringify(data, null, 2)}`)
      return
    }

    // Verify message sequence
    const { isValid, expectedSequence } = messageSequenceValidator.isMessageSequential(data)
    if (!isValid) {
      webSocket.refresh()
      log.debug(`WebSocket[${wsInfo.connectId}] message out of sequence. Expected ${expectedSequence}, received ${data.data.sequence}`)
    }

    subPubManager.distributeMessage(data)
  })

  webSocket.on('error', (error)=> {
    log.notice(`WebSocket[${wsInfo.connectId}] ${error.message}`)
  })


  webSocket.on('available', (data)=> {
    // Resubscribe when WebSocket connection is available
    const subscriptions = subPubManager.getSubscriptions()
    subscriptions.forEach((subscription) => webSocket.send(subscription))
  })

  webSocket.on('timeout', ()=> {
    log.notice(`WebSocket[${wsInfo.connectId}] timed out after ${wsInfo.timeout / 1000} seconds`)
  })

  webSocket.on('delay', (retryNumber, delay)=> {
    log.info(`WebSocket[${wsInfo.connectId}] will try reconnecting in ${delay / 1000} seconds`)
  })

  webSocket.on('connecting', (retryNumber, delay)=> {
    log.info(`WebSocket[${wsInfo.connectId}] connecting... (${retryNumber})`)
  })

  webSocket.on('reconnected', (retryNumber, lastConnectedMts)=> {
    log.info(`WebSocket[${wsInfo.connectId}] reconnected after ${(Date.now() - lastConnectedMts) / 1000} seconds (${retryNumber})`)
  })

  webSocket.on('closed', ()=> {
    log.notice(`WebSocket[${wsInfo.connectId}] closed`)
  })

  return webSocket
}
