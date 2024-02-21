import WebSocket from 'isomorphic-ws'
import uniqid from 'uniqid'
import { WebSocketConnectWrapper } from '../rest/webSocketConnectWrapper.mjs'
import { ForeverWebSocket } from 'forever-websocket'
import { createPubSubManager } from './subPubManager.mjs'
import { createMessageSequenceValidator } from './messageSequenceValidator.mjs'
import { unsubscribe } from './unsubscribe.mjs'
import { subscribe } from './subscribe.mjs'

export function createWebSocketClient(credentialsToUse, serviceConfig, market) {
  const log = serviceConfig.logger
  const webSocketConnect = new WebSocketConnectWrapper(credentialsToUse, serviceConfig)
  const getConnectTokenFunctions = {
    spot: {
      public: webSocketConnect.getSpotPublicChannelsToken,
      private: webSocketConnect.getSpotPrivateChannelsToken,
    },
    futures: {
      public: webSocketConnect.getFuturesPublicChannelsToken,
      private: webSocketConnect.getFuturesPrivateChannelsToken,
    },
  }

  const getConnectToken = getConnectTokenFunctions[market][credentialsToUse.apiKey ? 'private' : 'public'].bind(webSocketConnect)

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
    wsInfo.connectId = uniqid.time()
    wsInfo.timeout = instanceServer.pingInterval + instanceServer.pingTimeout
    wsInfo.pingId = wsInfo.connectId
    webSocket.updateOptions(
      {
        ping: {
          interval: instanceServer.pingInterval,
          data: {
            id: wsInfo.pingId,
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
          type: "ping",
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
      log.debug(`WebSocket[[${wsInfo.connectId}] pong`)
      return
    }

    if (data.type === 'welcome' && data.id === wsInfo.connectId) {
      log.debug(`WebSocket[${wsInfo.connectId}] available`)
      wsInfo.isAvailable = true
      webSocket.emit('available', data)
      return
    }

    // Verify message sequence
    const { isValid, expectedSequence } = messageSequenceValidator.isMessageSequential(data)
    if (!isValid) {
      webSocket.refresh()
      log.debug(`WebSocket[${wsInfo.connectId}] Message out of sequence. Expected ${expectedSequence}, received ${data.data.sequence}`)
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
    log.info(`WebSocket[${wsInfo.connectId}] will reconnected after ${delay / 1000} seconds`)
  })

  webSocket.on('connecting', (retryNumber, delay)=> {
    log.info(`WebSocket[${wsInfo.connectId}] Connecting... (${retryNumber})`)
  })

  webSocket.on('reconnected', (retryNumber, lastConnectedMts)=> {
    log.info(`WebSocket[${wsInfo.connectId}] reconnected after ${(Date.now() - lastConnectedMts) / 1000} seconds (${retryNumber})`)
  })

  webSocket.on('closed', ()=> {
    log.notice(`WebSocket[${wsInfo.connectId}] closed`)
  })

  return webSocket
}
