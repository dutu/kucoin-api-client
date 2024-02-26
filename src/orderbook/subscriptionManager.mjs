import { OrderbookManager } from './orderbookManager.mjs'

/**
 * Creates and manages a subscriptions for orderbookManagers.
 *
 * @example
 * const manager = createOrderbookSubscriptionManager()
 * let callback = (data) => console.log(data)
 * manager.subscribe({ symbol: 'BTCUSD' }, callback)
 * manager.unsubscribe({ symbol: 'BTCUSD' }, callback)
 */
export function createOrderbookSubscriptionManager(credentialsToUse, serviceConfigToUse) {
  const orderbookManagers = {
    spot: {},
    futures: {},
  }

  function validateMarket(market) {
    if (!(market === 'spot' || market === 'futures')) {
      throw new Error('market must be "spot" or "futures"')
    }
  }

  /**
   * Subscribes to orderbook updates for a given symbol and market.
   * The subscription begins immediately based on the activeState parameter
   *
   * @param {Object} param0 - Configuration object for subscription.
   * @param {string} param0.symbol - The symbol of the orderbook to subscribe to (e.g., 'BTCUSD').
   * @param {'spot' | 'futures'} param0.market - The market type of the orderbook (either 'spot' or 'futures').
   * @param {Function} callback - Function to call with orderbook updates. Receives the updated data as its argument.
   *
   */
  function subscribe({ symbol, market}, callback) {
    validateMarket(market)

    // Create a new Orderoom Manager only if one doesn't exists already for this symbol
    orderbookManagers[market][symbol] ??= new OrderbookManager({ symbol, market }, credentialsToUse, serviceConfigToUse )

    // Only register the listener if not already registered
    if (orderbookManagers[market][symbol].listenerCount('orderbook', callback) === 0) {
      orderbookManagers[market][symbol].addListener('orderbook', callback)
    }
  }

  /**
   * Unsubscribes from orderbook updates for a given symbol.
   *
   * This function removes the specified callback from the orderbook updates of the given symbol and market.
   * If the callback is successfully removed and there are still other listeners present, it returns the
   * OrderbookManager instance for further operations. If there are no more listeners after removal, it stops
   * the OrderbookManager for that symbol and market and deletes its reference, returning null. If the symbol
   * and market combination does not exist, it returns undefined.
   *
   * @param {Object} param0 - Configuration object for unsubscription.
   * @param {string} param0.symbol - The symbol of the orderbook to unsubscribe from.
   * @param {'spot' | 'futures'} param0.market - The market of the orderbook to unsubscribe from.
   * @param {Function} callback - Callback that was used for subscription.
   */
  function unsubscribe({ symbol, market }, callback) {
    validateMarket(market)

    if (!orderbookManagers[market][symbol] || orderbookManagers[market][symbol].listenerCount('orderbook') === 0) {
      throw new Error(`Callback is not registered as a listener for orderbook ${market}/${symbol}`)
    }

    orderbookManagers[market][symbol].removeListener('orderbook', callback)
  }
  
  return { subscribe, unsubscribe }
}
