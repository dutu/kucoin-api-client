import { BaseWrapper } from './baseWrapper.mjs'

/**
 * Class representing the Margin Trading functionality.
 */
export class MarginTradingWrapper extends BaseWrapper {
  constructor(credentials, serviceConfig) {
    super(credentials, serviceConfig)
  }

  market = {
    getCrossMarginSymbols: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/margin/symbols',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getMarginConfig: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/margin/config',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getETFInfo: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/etf/info',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getMarkPriceList: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/mark-price/all-symbols',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getMarkPriceDetail: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/mark-price/{symbol}/current',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getIsolatedMarginSymbols: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/isolated/symbols',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },
  }

  orders = {
    addOrder: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/hf/margin/order',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    addOrderTest: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/hf/margin/order/test',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelOrderByOrderId: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/hf/margin/orders/{orderId}',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelOrderByClientOid: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/hf/margin/orders/client-order/{clientOid}',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    cancelAllOrdersBySymbol: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/hf/margin/orders',
        method: 'DELETE',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getSymbolsWithOpenOrder: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/hf/margin/order/active/symbols',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getOpenOrders: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/hf/margin/orders/active',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getClosedOrders: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/hf/margin/orders/done',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getTradeHistory: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/hf/margin/fills',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getOrderByOrderId: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/hf/margin/orders/{orderId}',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getOrderByClientOid: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/hf/margin/orders/client-order/{clientOid}',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },
  }

  debit = {
    borrow: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/margin/borrow',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getBorrowHistory: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/margin/borrow',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    repay: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/margin/repay',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getRepayHistory: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/margin/repay',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getInterestHistory: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/margin/interest',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    modifyLeverage: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/position/update-user-leverage',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },
  }

  credit = {
    getLoanMarket: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/project/list',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getLoanMarketInterestRate: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/project/marketInterestRate',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    purchase: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/purchase',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    modifyPurchase: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/lend/purchase/update',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getPurchaseOrders: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/purchase/orders',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    redeem: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/redeem',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },

    getRedeemOrders: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/redeem/orders',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },
  }

  riskLimit = {
    getMarginRiskLimit: (params) => {
      return this.makeRequest({
        endpoint: '/api/v3/margin/currencies',
        method: 'GET',
        requiresAuth: true,
        baseUrl: 'spot',
        params,
      })
    },
  }
}
