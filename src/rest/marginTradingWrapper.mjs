import { BaseWrapper } from './baseWrapper.mjs'

/**
 * Class representing the Margin Trading functionality.
 */
export class MarginTradingWrapper extends BaseWrapper {
  constructor(credentials, serviceConfig) {
    super(credentials, serviceConfig)
  }

  /*
    Orders
  */

  addOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/order',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  addOrderTest(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/order/test',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelOrderByOrderId(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/orders/{orderId}',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelOrderByClientOid(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/orders/client-order/{clientOid}',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelAllOrdersBySymbol(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/orders',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getSymbolsWithOpenOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/order/active/symbols',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getOpenOrders(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/orders/active',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getClosedOrders(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/orders/done',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getTradeHistory(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/fills',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getOrderByOrderId(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/orders/{orderId}',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getOrderByClientOid(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/orders/client-order/{clientOid}',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getLeveragedTokenInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v3/etf/info',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getMarkPrice(params) {
    return this.makeRequest({
      endpoint: '/api/v1/mark-price/{symbol}/current',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getMarginConfigurationInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v1/margin/config',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getMarginCurrencyInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v3/margin/currencies',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getIsolatedMarginSymbolsInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v1/isolated/symbols',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getIsolatedMarginAccountInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v1/isolated/accounts',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getSingleIsolatedMarginAccountInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v1/isolated/account/{symbol}',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  marginBorrow(params) {
    return this.makeRequest({
      endpoint: '/api/v3/margin/borrow',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  marginRepay(params) {
    return this.makeRequest({
      endpoint: '/api/v3/margin/repay',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getMarginBorrowingHistory(params) {
    return this.makeRequest({
      endpoint: '/api/v3/margin/borrow',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getMarginRepaymentHistory(params) {
    return this.makeRequest({
      endpoint: '/api/v3/margin/repay',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }
  getLendingCurrencyInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v3/project/list',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getLendingInterestRates(params) {
    return this.makeRequest({
      endpoint: '/api/v3/project/marketInterestRate',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  placeLendingSubscriptionOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v3/purchase',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  placeLendingRedemptionOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v3/redeem',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  updateLendingSubscriptionOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v3/lend/purchase/update',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getLendingSubscriptionOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v3/purchase/orders',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getLendingRedemptionOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v3/redeem/orders',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  /*
    Debit
  */

  // TODO: Debit methods

  /*
  Credit
  */

  // TODO: Credit methods

  /*
  Risk Limit
  */

  // TODO: Risk Limit methods
}
