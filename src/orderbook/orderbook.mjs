import EventEmitter from 'eventemitter3'
import { createWebSocketClient } from '../webSocket/webSocketClient.mjs'
import { SpotTradingWrapper } from '../rest/spotTradingWrapper.mjs'
import { FuturesTradingWrapper } from '../rest/futuresTradingWrapper.mjs'
import { createPolynomialBackoff } from '../utils/backoff.mjs'

const Fields = {
  price: 0,
  size: 1,
  seq: 2,
  side: 3,
}

const BaseTopic = {
  spot: '/market/level2:',
  futures: '/contractMarket/level2:',
}

export class Orderbook extends EventEmitter {
  #symbol
  #market
  #log
  #webSocketClient
  #currentSequence = 0
  #isRequestSnapshotInProgress = false
  #cacheSortedBySequence = []
  #orderbook = {}
  #backoff
  #trading

  constructor({ symbol, market }, credentialsToUse, serviceConfigToUse) {
    super()
    this.#symbol = symbol
    this.#market = market
    this.#log = serviceConfigToUse.logger

    this.#backoff = createPolynomialBackoff({ minValue: 50, maxValue: 10000, degree: 3 })

    this.#trading = this.#market === 'spot'
      ? new SpotTradingWrapper(credentialsToUse, serviceConfigToUse)
      : new FuturesTradingWrapper(credentialsToUse, serviceConfigToUse)

    // Initiate a WebSocket client to receive orderbook updates
    this.#webSocketClient = createWebSocketClient(credentialsToUse, serviceConfigToUse, market)
    const subscription = {
      type: 'subscribe',
      topic: BaseTopic[this.#market] + this.#symbol,
      response: true,
    }

    this.#webSocketClient.subscribe(subscription, this.#applyWebSocketUpdate.bind(this))
    this.#webSocketClient.connect()
    this.#requestSnapshot()
  }

  async #requestSnapshot() {
    if (this.#isRequestSnapshotInProgress) return
    this.#isRequestSnapshotInProgress = true
    this.#orderbook = {}
    while (true) {
      try {
        const result = await this.#trading.getFullOrderBook({ symbol: this.#symbol })
        this.#orderbook = result.data
        break
      } catch (e) {
        this.#log.notice(e.message)
        await this.#backoff.delay()
      }
    }

    this.#backoff.reset()
    this.#applyChangesFromCache()
    this.#isRequestSnapshotInProgress = false
    this.emit('orderbook', this.#orderbook)
  }

  #applyChangesFromCache() {
    const cache = this.#cacheSortedBySequence
    let index = 0
    while (index < cache.length) {
      const change = cache[index]

      // Check if outdated change
      if (Number(change[Fields.seq]) <= Number(this.#orderbook.sequence)) {
        cache.splice(index, 1)
        continue
      }

      // Check change is next in sequence
      if (Number(change[Fields.seq]) === Number(this.#orderbook.sequence) + 1) {
        this.#applyChange(change)
        index += 1
        continue
      }

      // We are missing updates and need to get a new snapshot
      this.#addChangeToCache(change)
      this.#requestSnapshot()
    }
  }

  #addChangeToCache(change) {
    const cache = this.#cacheSortedBySequence
    const sequence = Number(change[Fields.seq])
    const positionToInsert = cache.findIndex((change) => Number(change[Fields.seq]) >= sequence)

    // Check if all cached sequences are smaller
    if (positionToInsert === -1) {
      cache.push(change)
      return
    }

    // Check if the sequence is already in cache
    const shouldReplaceExistingPosition = cache[positionToInsert][Fields.seq] === sequence ? 1 : 0

    // Replace or add change to cache
    cache.splice(positionToInsert, shouldReplaceExistingPosition, change)
  }


  /*
   * Applies a change to the order book.
   * Updates the specified side ('asks' or 'bids') by adding, updating, or deleting an order.
   * Orders are kept sorted by price. A size of '0' indicates that the order should be removed.
   *
   * Params:
   * - change: Object containing [price, size, seq, side]
   */
  #applyChange = (change) => {
    const side = change[Fields.side]
    const obSide = this.#orderbook[side]
    const price = Number(change[Fields.price])
    const size = change[Fields.size]
    const sequence = change[Fields.seq]

    if (!this.#orderbook[side]) {
      this.#orderbook[side] = []
    }

    // Find the index where price is less than (for bids) or greater than (for asks) the current price
    // or where the price is exactly equal to handle the update or delete
    const index = obSide.findIndex((entry) => {
      return side === 'asks' ? Number(entry[Fields.price]) >= price : Number(entry[Fields.price]) <= price
    })

    if (index !== -1) {
      // If the found price is equal, update or delete
      if (Number(obSide[index][Fields.price]) === price) {
        if (Number(size) === 0) {
          // Size 0 indicates deletion
          obSide.splice(index, 1)
        } else {
          // Update size
          obSide[index][Fields.size] = size
        }
      } else {
        // Price not equal, implies new entry. Insert before the found index for asks, after for bids
        const newEntry = [change[Fields.price], size]
        obSide.splice(index, 0, newEntry)
      }
    } else {
      // No entry found, or should be added to the end
      const newEntry = [change[Fields.price], size]
      obSide.push(newEntry)
    }

    this.#orderbook.sequence = sequence
  }


  /*
   * Applies changes from an WebSocket update message to the order book.
   */
  #applyWebSocketUpdate(update) {
    if (update.subject !== 'trade.l2update') {
      // Filter out irrelevant messages
      return
    }

    const askChanges = update.data.changes.asks.map((change) => [...change, 'asks'])
    const bidChanges = update.data.changes.bids.map((change) => [...change, 'bids'])
    const changesSortedBySequence = [...askChanges, ...bidChanges].sort((a, b) => Number(a[Fields.seq]) - Number(b[Fields.seq]))
    for (const change of changesSortedBySequence) {
      const changeSequence = Number(change[Fields.seq])
      // Check if outdated update
      if ( changeSequence <= this.#currentSequence) {
        // Skip change
        continue
      }

      // Check if the change is the next one in sequence
      if (changeSequence === this.#currentSequence + 1) {
        this.#applyChange(change)
        continue
      }

      // We are missing updates and need to get a new snapshot
      this.#addChangeToCache(change)
      this.#requestSnapshot()
    }

    if (!this.#isRequestSnapshotInProgress) {
      this.emit('orderbook', this.#orderbook)
    }
  }

  /**
   * Cleans up resources and internal state of the Orderbook instance.
   * This method unsubscribes from the current WebSocket feed, closes the WebSocket connection,
   * and resets the internal properties to their default states. It should be called when the
   * Orderbook instance is no longer needed or before creating a new instance to avoid memory leaks
   * and ensure proper release of resources.
   */
  destroy() {
    const subscription = {
      type: 'unsubscribe',
      topic: BaseTopic[this.#market] + this.#symbol,
      response: true,
    }

    this.#webSocketClient.unsubscribe(subscription, this.#applyWebSocketUpdate.bind(this))
    this.#webSocketClient.close()
    this.#webSocketClient = null
    this.#orderbook = {}
    this.#cacheSortedBySequence = []
  }
}
