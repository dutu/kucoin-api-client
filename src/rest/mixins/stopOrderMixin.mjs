/**
 * Creates a mix-in to add stop order related methods to a trading wrapper class.
 *
 * @param {Class} Base - The base class to extend with market data functionality.
 * @returns {Class} A new class extending `Base` with additional stop order methods.
 */
export const stopOrderMixin = (Base) => class extends Base {
  placeStopOrder(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/stop-order',
      method: 'POST',
      requireAuth: true,
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })  }

  cancelStopOrderByOrderId(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/stop-order/{orderId}',
      method: 'DELETE',
      requireAuth: true,
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })  }

  cancelStopOrderByClientOid(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/stop-order/cancelOrderByClientOid',
      method: 'DELETE',
      requireAuth: true,
      baseUrl: 'spot',
      params,onRateLimitInfoCallback
    })  }

  cancelStopOrders(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/stop-order/cancel',
      method: 'DELETE',
      requireAuth: true,
      baseUrl: 'spot',
      params,onRateLimitInfoCallback
    })  }

  getStopOrdersList(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/stop-order',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,onRateLimitInfoCallback
    })  }

  getStopOrderDetailsByOrderId(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/stop-order/{orderId}',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getStopOrderDetailsByClientOid(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/stop-order/queryOrderByClientOid',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }
}
