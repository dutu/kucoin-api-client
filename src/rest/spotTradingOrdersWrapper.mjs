import { BaseWrapper } from './baseWrapper.mjs'

/**
 * Class representing the Spot Trading functionality.
 */
export class SpotTradingWrapper extends BaseWrapper {
  constructor(credentials, serviceConfig) {
    super(credentials, serviceConfig)
  }

  /*
     Market Data
  */

  getAnnouncements(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v3/announcements',
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

  getCurrencyList(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v3/currencies',
      method: 'GET',
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getSymbolDetail(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v2/symbols/{symbol}',
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

  getTradeHistory(params, onRateLimitInfoCallback) {
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
      requiresAuth: true,
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

  getClientIpAddress(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/my-ip',
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

  /*
   Orders
  */

  addOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  addOrderSync(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/sync',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  addOrderTest(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/test',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  addBatchOrders(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/multi',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  addBatchOrdersSync(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/multi/sync',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelOrderByOrderId(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/{orderId}',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelOrderByOrderIdSync(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/sync/{orderId}',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelOrderByClientOid(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/client-order/{clientOid}',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelOrderByClientOidSync(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/sync/client-order/{clientOid}',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelPartialOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/cancel/{orderId}',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelAllOrdersBySymbol(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelAllOrders(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/cancelAll',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  modifyOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/alter',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getOrderByOrderId(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/{orderId}',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getOrderByClientOid(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/client-order/{clientOid}',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getSymbolsWithOpenOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/active/symbols',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getOpenOrders(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/active',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getClosedOrders(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/done',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getTradeHistory(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/fills',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getDcp(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/dead-cancel-all/query',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  setDcp(params) {
    return this.makeRequest({
      endpoint: '/api/v1/hf/orders/dead-cancel-all',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  addStopOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v1/stop-order',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelStopOrderByClientOid(params) {
    return this.makeRequest({
      endpoint: '/api/v1/stop-order/cancelOrderByClientOid',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelStopOrderByOrderId(params) {
    return this.makeRequest({
      endpoint: '/api/v1/stop-order/{orderId}',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelBatchStopOrders(params) {
    return this.makeRequest({
      endpoint: '/api/v1/stop-order/cancel',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getStopOrders(params) {
    return this.makeRequest({
      endpoint: '/api/v1/stop-order',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getStopOrderByOrderId(params) {
    return this.makeRequest({
      endpoint: '/api/v1/stop-order/{orderId}',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getStopOrderByClientOid(params) {
    return this.makeRequest({
      endpoint: '/api/v1/stop-order/queryOrderByClientOid',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  addOcoOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v3/oco/order',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelOcoOrderByOrderId(params) {
    return this.makeRequest({
      endpoint: '/api/v3/oco/order/{orderId}',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelOcoOrderByClientOid(params) {
    return this.makeRequest({
      endpoint: '/api/v3/oco/client-order/{clientOid}',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelBatchOcoOrders(params) {
    return this.makeRequest({
      endpoint: '/api/v3/oco/orders',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getOcoOrderByOrderId(params) {
    return this.makeRequest({
      endpoint: '/api/v3/oco/order/{orderId}',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getOcoOrderByClientOid(params) {
    return this.makeRequest({
      endpoint: '/api/v3/oco/client-order/{clientOid}',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getOcoOrderDetailsByOrderId(params) {
    return this.makeRequest({
      endpoint: '/api/v3/oco/order/details/{orderId}',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getOcoOrderList(params) {
    return this.makeRequest({
      endpoint: '/api/v3/oco/orders',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }
}
