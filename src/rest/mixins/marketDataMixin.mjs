/**
 * Creates a mix-in to add market data related methods to a trading wrapper class.
 *
 * @param {Class} Base - The base class to extend with market data functionality.
 * @returns {Class} A new class extending `Base` with additional market data methods.
 */
export const marketDataMixin = (Base) => class extends Base {
  getCurrencyList(params) {
    return this.makeRequest({
      endpoint: '/api/v3/currencies',
      method: 'GET',
      baseUrl: 'spot',
      params,
    })
  }

  getCurrencyDetail(params) {
    return this.makeRequest({
      endpoint: '/api/v3/currencies/{currency}',
      method: 'GET',
      baseUrl: 'spot',
      params,
    })
  }

  getSymbolsList(params) {
    return this.makeRequest({
      endpoint: '/api/v2/symbols',
      method: 'GET',
      baseUrl: 'spot',
      params,
    })
  }

  getTicker(params) {
    return this.makeRequest({
      endpoint: '/api/v1/market/orderbook/level1',
      method: 'GET',
      baseUrl: 'spot',
      params,
    })
  }

  getAllTickers(params) {
    return this.makeRequest({
      endpoint: '/api/v1/market/allTickers',
      method: 'GET',
      baseUrl: 'spot',
      params,
    })
  }

  getStats(params) {
    return this.makeRequest({
      endpoint: '/api/v1/market/stats',
      method: 'GET',
      baseUrl: 'spot',
      params,
    })
  }

  getMarketList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/markets',
      method: 'GET',
      baseUrl: 'spot',
      params,
    })
  }

  getPartOrderBook(params) {
    return this.makeRequest({
      endpoint: '/api/v1/market/orderbook/{level}',
      method: 'GET',
      baseUrl: 'spot',
      params,
    })
  }

  getFullOrderBook(params) {
    return this.makeRequest({
      endpoint: '/api/v3/market/orderbook/level2',
      method: 'GET',
      baseUrl: 'spot',
      params,
    })
  }

  getTradeHistories(params) {
    return this.makeRequest({
      endpoint: '/api/v1/market/histories',
      method: 'GET',
      baseUrl: 'spot',
      params,
    })
  }

  getKlines(params) {
    return this.makeRequest({
      endpoint: '/api/v1/market/candles',
      method: 'GET',
      baseUrl: 'spot',
      params,
    })
  }

  getPrices(params) {
    return this.makeRequest({
      endpoint: '/api/v1/prices',
      method: 'GET',
      baseUrl: 'spot',
      params,
    })
  }

  getServerTime(params) {
    return this.makeRequest({
      endpoint: '/api/v1/timestamp',
      method: 'GET',
      baseUrl: 'spot',
      params,
    })
  }

  getServiceStatus(params) {
    return this.makeRequest({
      endpoint: '/api/v1/status',
      method: 'GET',
      baseUrl: 'spot',
      params,
    })
  }
}
