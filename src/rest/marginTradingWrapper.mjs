import { BaseWrapper } from './baseWrapper.mjs'
import { marketDataMixin } from './mixins/marketDataMixin.mjs'
import { fillsMixin } from './mixins/fillsMixin.mjs'
import { stopOrderMixin } from './mixins/stopOrderMixin.mjs'
import { composeMixins } from '../utils/composeMixins.mjs'

/**
 * Class representing the Margin Trading functionality.
 * The class uses mixins to include trading methods common for spot and margin.
 */
export class MarginTradingWrapper extends composeMixins(marketDataMixin, fillsMixin, stopOrderMixin)(BaseWrapper) {
  constructor(credentials, serviceConfig) {
    super(credentials, serviceConfig)
  }

  placeHfOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/order',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  placeHfOrderTest(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/order/test',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelHfOrderByOrderId(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/orders/{orderId}?symbol={symbol}',
      method: 'DELETE',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelHfOrderByClientOid(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/orders/client-order/{clientOid}?symbol={symbol}',
      method: 'DELETE',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelAllHfOrdersBySymbol(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/orders?symbol={symbol}&tradeType={tradeType}',
      method: 'DELETE',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getActiveHfOrdersList(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/orders/active?tradeType={tradeType}&symbol={symbol}',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getFilledHfOrdersList(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/orders/done',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getHfOrderDetailsByOrderId(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/orders/{orderId}?symbol={symbol}',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getHfOrderDetailsByClientOid(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/orders/client-order/{clientOid}?symbol={symbol}',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getHfTransactionRecords(params) {
    return this.makeRequest({
      endpoint: '/api/v3/hf/margin/fills',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  placeMarginOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v1/margin/order',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  placeMarginOrderTest(params) {
    return this.makeRequest({
      endpoint: '/api/v1/margin/order/test',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getLeveragedTokenInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v3/etf/info',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getMarkPrice(params) {
    return this.makeRequest({
      endpoint: '/api/v1/mark-price/{symbol}/current',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getMarginConfigurationInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v1/margin/config',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getMarginCurrencyInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v3/margin/currencies',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getIsolatedMarginSymbolsInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v1/isolated/symbols',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getIsolatedMarginAccountInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v1/isolated/accounts',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getSingleIsolatedMarginAccountInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v1/isolated/account/{symbol}',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  marginBorrow(params) {
    return this.makeRequest({
      endpoint: '/api/v3/margin/borrow',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  marginRepay(params) {
    return this.makeRequest({
      endpoint: '/api/v3/margin/repay',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getMarginBorrowingHistory(params) {
    return this.makeRequest({
      endpoint: '/api/v3/margin/borrow',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getMarginRepaymentHistory(params) {
    return this.makeRequest({
      endpoint: '/api/v3/margin/repay',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }
  getLendingCurrencyInfo(params) {
    return this.makeRequest({
      endpoint: '/api/v3/project/list',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getLendingInterestRates(params) {
    return this.makeRequest({
      endpoint: '/api/v3/project/marketInterestRate',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  placeLendingSubscriptionOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v3/purchase',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  placeLendingRedemptionOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v3/redeem',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  updateLendingSubscriptionOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v3/lend/purchase/update',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getLendingSubscriptionOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v3/purchase/orders',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getLendingRedemptionOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v3/redeem/orders',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
    })
  }
}
