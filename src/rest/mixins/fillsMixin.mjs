/**
 * Creates a mix-in to add fills related methods to a trading wrapper class.
 *
 * @param {Class} Base - The base class to extend with market data functionality.
 * @returns {Class} A new class extending `Base` with additional fills methods.
 */
export const fillsMixin = (Base) => class extends Base {
  getFilledList(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/fills',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

  getRecentFilledList(params, onRateLimitInfoCallback) {
    return this.makeRequest({
      endpoint: '/api/v1/limit/fills',
      method: 'GET',
      requireAuth: true,
      baseUrl: 'spot',
      params,
      onRateLimitInfoCallback,
    })
  }

}
