import { BaseWrapper } from './baseWrapper.mjs'

/**
 * Class representing the Futures Trading functionality.
 */
export class FuturesTradingWrapper extends BaseWrapper {
  constructor(credentials, serviceConfig) {
    super(credentials, serviceConfig)
  }

  market = {
    getPublicToken: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/bullet-public',
        method: 'POST',
        baseUrl: 'futures',
        params,
      })
    },

    getPrivateToken: (params) => {
      return this.makeRequest({
        endpoint: '/api/v1/bullet-private',
        method: 'POST',
        requiresAuth: true,
        baseUrl: 'futures',
        params,
      })
    },
  }
}
