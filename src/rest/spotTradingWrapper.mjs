import { BaseWrapper } from './baseWrapper.mjs'

/**
 * Class representing the Spot Trading functionality.
 */
export class SpotTradingWrapper extends BaseWrapper {
  constructor(credentials, serviceConfig) {
    super(credentials, serviceConfig)
  }

  market = {
    getAnnouncements: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/announcements',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getCurrency: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/currencies/{currency}',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getAllCurrencies: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/currencies',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getSymbol: (params) => {
      return this.makeRequest({
        endpoint: '/api/v2/symbols/{symbol}',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getAllSymbols: (params) => {
      return this.makeRequest({
        endpoint: '/api/v2/symbols',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getTicker: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/market/orderbook/level1',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getAllTickers: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/market/allTickers',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getTradeHistory: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/market/histories',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getKlines: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/market/candles',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getPartOrderBook: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/market/orderbook/{level}',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getFullOrderBook: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/market/orderbook/level2',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getFiatPrice: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/prices',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    get24hrStats: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/market/stats',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getMarketList: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/markets',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getClientIPAddress: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/my-ip',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getServerTime: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/timestamp',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getServiceStatus: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/status',
        method: 'GET',
        baseUrl: 'spot',
        params,
      })
    },

    getPublicToken(params) {
      return this.makeRequest({
        endpoint: '/api/v1/bullet-public',
        method: 'POST',
        baseUrl: 'spot',
        params,
      })
    },

    getPrivateToken(params) {
      return this.makeRequest({
        endpoint: '/api/v1/bullet-private',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },
  }

  orders = {
    addOrder: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    addOrderSync: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/sync',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    addOrderTest: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/test',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    batchAddOrders: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/multi',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    batchAddOrdersSync: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/multi/sync',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelOrderByOrderId: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/{orderId}',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelOrderByOrderIdSync: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/sync/{orderId}',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelOrderByClientOid: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/client-order/{clientOid}',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelOrderByClientOidSync: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/sync/client-order/{clientOid}',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelPartialOrder: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/cancel/{orderId}',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelAllOrdersBySymbol: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelAllOrders: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/cancelAll',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    modifyOrder: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/alter',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getOrderByOrderId: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/{orderId}',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getOrderByClientOid: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/client-order/{clientOid}',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getSymbolsWithOpenOrder: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/active/symbols',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getOpenOrders: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/active',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getClosedOrders: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/done',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getTradeHistory: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/fills',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getDCP: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/dead-cancel-all/query',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    setDCP: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/hf/orders/dead-cancel-all',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    addStopOrder: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/stop-order',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelStopOrderByClientOid: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/stop-order/cancelOrderByClientOid',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelStopOrderByOrderId: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/stop-order/{orderId}',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    batchCancelStopOrder: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/stop-order/cancel',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getStopOrdersList: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/stop-order',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getStopOrderByOrderId: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/stop-order/{orderId}',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getStopOrderByClientOid: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/stop-order/queryOrderByClientOid',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    addOcoOrder: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/oco/order',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelOcoOrderByOrderId: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/oco/order/{orderId}',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelOcoOrderByClientOid: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/oco/client-order/{clientOid}',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    batchCancelOcoOrders: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/oco/orders',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getOcoOrderByOrderId: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/oco/order/{orderId}',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getOcoOrderByClientOid: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/oco/client-order/{clientOid}',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getOcoOrderDetailByOrderId: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/oco/order/details/{orderId}',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getOcoOrderList: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/oco/orders',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },
  }
}
