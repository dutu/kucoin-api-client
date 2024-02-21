import { BaseWrapper } from './baseWrapper.mjs'
import { marketDataMixin } from './mixins/marketDataMixin.mjs'
import { fillsMixin } from './mixins/fillsMixin.mjs'
import { stopOrderMixin } from './mixins/stopOrderMixin.mjs'
import { composeMixins } from '../utils/composeMixins.mjs'

/**
 * Class representing the Spot Trading functionality.
 * The class uses mixins to include trading methods common for spot and margin.
 */
export class SpotTradingWrapper extends composeMixins(marketDataMixin, fillsMixin, stopOrderMixin)(BaseWrapper) {
  constructor(credentials, serviceConfig) {
    super(credentials, serviceConfig)
  }

  placeOrder(params) {
    return this.makeRequest({
      endpoint: '/api/v1/orders',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  placeOrderTest(params) {
    return this.makeRequest({
      endpoint: '/api/v1/orders/test',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  placeMultipleOrders(params) {
    return this.makeRequest({
      endpoint: '/api/v1/orders/multi',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelOrderByOrderId(params) {
    return this.makeRequest({
      endpoint: '/api/v1/orders/{orderId}',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelOrderByClientOid(params) {
    return this.makeRequest({
      endpoint: '/api/v1/order/client-order/{clientOid}',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  cancelAllOrders(params) {
    return this.makeRequest({
      endpoint: '/api/v1/orders',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getOrderList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/orders',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getRecentOrdersList(params) {
    return this.makeRequest({
      endpoint: '/api/v1/limit/orders',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getOrderDetailsByOrderId(params) {
    return this.makeRequest({
      endpoint: '/api/v1/orders/{orderId}',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getOrderDetailsByClientOid(params) {
    return this.makeRequest({
      endpoint: '/api/v1/order/client-order/{clientOid}',
      method: 'GET',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  placeOcoOrder(params) {
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

  cancelOcoOrders(params) {
    return this.makeRequest({
      endpoint: '/api/v3/oco/orders',
      method: 'DELETE',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getOcoOrderInfoByOrderId(params) {
    return this.makeRequest({
      endpoint: '/api/v3/oco/order/{orderId}',
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

  getOcoOrderInfoByClientOid(params) {
    return this.makeRequest({
      endpoint: '/api/v3/oco/client-order/{clientOid}',
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
