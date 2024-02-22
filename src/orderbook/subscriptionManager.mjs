import { Orderbook } from './orderbook.mjs'

/**
 * Creates and manages a subscriptions for orderbooks.
 *
 * @example
 * const manager = createOrderbookSubscriptionManager()
 * let callback = (data) => console.log(data)
 * manager.subscribe({ symbol: 'BTCUSD' }, callback)
 * manager.unsubscribe({ symbol: 'BTCUSD' }, callback)
 */
export function createOrderbookSubscriptionManager(credentialsToUse, serviceConfigToUse) {
  const orderbooks = {
    spot: {},
    futures: {},
  }

  function validateMarket(market) {
    if (!(market === 'spot' || market === 'futures')) {
      throw new Error('market must be "spot" or "futures"')
    }
  }

  /**
   * Subscribes to orderbook updates for a given symbol.
   *
   * @param {Object} param0 - Object containing the symbol to subscribe to.
   * @param {string} param0.symbol - The symbol of the orderbook to subscribe to.
   * @param {'spot' | 'futures'} param0.market - The market of the orderbook to subscribe to.
   * @param {Function} callback - Callback to execute when an update is received.
   */
  function subscribe({ symbol, market }, callback) {
    validateMarket(market)

    // Check if we already maintain the orderbook for this symbol
    if (orderbooks[market][symbol]) {
      // Check if listener is already registered
      if (orderbooks[market][symbol].listenerCount('orderbook', callback) > 0) {
        return
      }

      // Register listener
      orderbooks[market][symbol].addListener('orderbook', callback)
    } else {
      orderbooks[market][symbol] = new Orderbook({ symbol, market }, credentialsToUse, serviceConfigToUse )
      orderbooks[market][symbol].addListener('orderbook', callback)
    }
  }

  /**
   * Unsubscribes from orderbook updates for a given symbol.
   *
   * @param {Object} param0 - Object containing the symbol to unsubscribe from.
   * @param {string} param0.symbol - The symbol of the orderbook to unsubscribe from.
   * @param {'spot' | 'futures'} param0.market - The market of the orderbook to subscribe to.
   * @param {Function} callback - Callback that was used for subscription.
   */
  function unsubscribe({ symbol, market }, callback) {
    validateMarket(market)

    if (!orderbooks[market][symbol]) {
      return
    }

    if (orderbooks[market][symbol].listenerCount('orderbook', callback) > 0) {
      orderbooks[market][symbol].removeListener('orderbook', callback)
    }

    if (orderbooks[market][symbol].listenerCount('orderbook') === 0) {
      orderbooks[market][symbol].stop()
      delete orderbooks[market][symbol]
    }
  }

  return { subscribe, unsubscribe }
}
