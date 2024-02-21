import { BaseWrapper } from './baseWrapper.mjs'

export class WebSocketConnectWrapper extends BaseWrapper {
  constructor(credentials, serviceConfig) {
    super(credentials, serviceConfig)
  }

  getSpotPublicChannelsToken(params) {
    return this.makeRequest({
      endpoint: '/api/v1/bullet-public',
      method: 'POST',
      baseUrl: 'spot',
      params,
    })
  }

  getSpotPrivateChannelsToken(params) {
    return this.makeRequest({
      endpoint: '/api/v1/bullet-private',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'spot',
      params,
    })
  }

  getFuturesPublicChannelsToken(params) {
    return this.makeRequest({
      endpoint: '/api/v1/bullet-public',
      method: 'POST',
      baseUrl: 'futures',
      params,
    })
  }

  getFuturesPrivateChannelsToken(params) {
    return this.makeRequest({
      endpoint: '/api/v1/bullet-private',
      method: 'POST',
      requiresAuth: true,
      baseUrl: 'futures',
      params,
    })
  }
}
