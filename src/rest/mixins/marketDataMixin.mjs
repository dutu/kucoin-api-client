/**
 * Creates a mix-in to add market data related methods to a trading wrapper class.
 *
 * @param {Class} Base - The base class to extend with market data functionality.
 * @returns {Class} A new class extending `Base` with additional market data methods.
 */
export const marketDataMixin = (Base) => class extends Base {
  getCurrencyList(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v3/currencies',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getCurrencyDetail(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v3/currencies/{currency}',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getSymbolsList(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v2/symbols',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getTicker(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/market/orderbook/level1',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getAllTickers(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/market/allTickers',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getStats(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/market/stats',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getMarketList(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/markets',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getPartOrderBook(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/market/orderbook/{level}',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getFullOrderBook(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v3/market/orderbook/level2',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getTradeHistories(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/market/histories',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getKlines(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/market/candles',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getPrices(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/prices',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getServerTime(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/timestamp',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getServiceStatus(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/status',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }
}
