import crypto from 'crypto'
import axios from 'axios'
import { toQueryString } from '../utils/toQueryString.mjs'
import { convertNumbersToStrings } from '../utils/convertNumbersToStrings.mjs'

export class BaseWrapper {
  #apiKey
  #apiSecret
  #apiPassphrase
  #apiKeyVersion
  #eventEmitter
  #client
  #baseURLs = {
    spot: `https://api.kucoin.com`,
    futures: 'https://api-futures.kucoin.com',
  }

  constructor({ apiKey, apiSecret, apiPassphrase, apiKeyVersion } = {}, { eventEmitter, logger }) {
    this.#apiKey = apiKey
    this.#apiSecret = apiSecret
    this.#apiPassphrase = apiPassphrase
    this.#apiKeyVersion = apiKeyVersion
    this.#eventEmitter = eventEmitter
    this.#client = axios.create()
  }

  /**
   * Performs an HTTP request to the specified endpoint with given parameters.
   * Supports adding authentication headers for protected endpoints and provides
   * mechanisms for accessing rate limit information either through a callback or an event.
   *
   * @param {Object} config - Configuration for the request.
   * @param {string} config.endpoint - The API endpoint.
   * @param {string} config.method - The HTTP method (GET, POST, PUT, DELETE, PATCH).
   * @param {string} config.baseUrl - The base URL key for determining the full URL.
   * @param {boolean} [config.requiresAuth=false] - Indicates if the request requires authentication.
   * @param {Object} [config.params={}] - The parameters for the request.
   * @param {Function} [config.onRateLimitInfoCallback=null] - An optional callback that, if provided,
   *        will be called with rate limit information from the API response. The information
   *        includes total resource pool quota, remaining quota, and reset countdown (milliseconds).
   *        Signature: (rateLimitInfo: {limit: number, remaining: number, reset: number}) => void
   * @throws {Error} If an unsupported HTTP method is used or if authentication is required but the API key is missing.
   *
   * Example of using the callback:
   * ```
   * apiWrapper.makeRequest({
   *   endpoint: '/example',
   *   method: 'GET',
   *   baseUrl: 'https://api.example.com',
   *   requiresAuth: true,
   *   onRateLimitInfoCallback: (info) => {
   *     console.log('Rate limit info:', info);
   *   }
   * });
   * ```
   * Additionally, this method emits rate limit information through the 'rateLimitInfo' event
   * if listeners are attached, providing an alternative mechanism to access this information.
   *
   * Example of using the callback:
   * ```
   * apiWrapper.makeRequest({
   *   endpoint: '/example',
   *   method: 'GET',
   *   baseUrl: 'https://api.example.com',
   *   requiresAuth: true,
   *   onRateLimitInfoCallback: (info) => {
   *     console.log('Rate limit info:', info);
   *   }
   * });
   * ```
   *
   * Example of attaching an event listener for rate limit information:
   * ```
   * apiWrapper.on('rateLimitInfo', (info) => {
   *   console.log('Received rate limit info via event emitter:', info);
   * });
   *
   * // Then make a request without providing the onRateLimitInfoCallback callback
   * apiWrapper.makeRequest({
   *   endpoint: '/example',
   *   method: 'GET',
   *   baseUrl: 'https://api.example.com',
   *   requiresAuth: true
   * });
   * ```
   */
  async makeRequest({ endpoint, method, baseUrl, requiresAuth = false, params = {}, onRateLimitInfoCallback = null }) {
    const supportedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

    if (!supportedMethods.includes(method)) {
      throw new Error(`HTTP method '${method}' is not supported.`)
    }

    // Error if authentication is required but no API key is provided
    if (requiresAuth && !this.#apiKey) {
      throw new Error('Authentication is required, but no API key was provided.')
    }

    const { finalEndpoint, queryParams } = this.#prepareEndpoint(endpoint, params)
    let url = `${this.#baseURLs[baseUrl]}${finalEndpoint}`

    const options = {
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    if (['GET', 'DELETE'].includes(method) && Object.keys(queryParams).length > 0) {
      options.url += `?${toQueryString(queryParams)}`
    }

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      options.data = JSON.stringify(convertNumbersToStrings(params))
    }

    if (requiresAuth) {
      Object.assign(options.headers, this.#getAuthHeaders(endpoint, method, options.data))
    }

    try {
      const response = await this.#client(options);

      // Extract rate limit information
      const rateLimitInfo = {
        limit: response.headers['gw-ratelimit-limit'],
        remaining: response.headers['gw-ratelimit-remaining'],
        reset: response.headers['gw-ratelimit-reset']
      };

      // Call the callback with rate limit info if provided
      if (typeof onRateLimitInfoCallback === 'function') {
        onRateLimitInfoCallback(rateLimitInfo);
      }

      // Emit rate limit info directly without checking for listeners
      this.#eventEmitter.emit('rateLimitInfo', rateLimitInfo);

      return response.data;
    } catch (error) {
      throw error;
    }  }

  /**
   * Prepares the API endpoint by replacing path placeholders with actual values from `params`.
   * Throws an error if `params` does not include all variables required in the endpoint.
   *
   * @param {string} endpoint - The API endpoint template with path placeholders.
   * @param {Object} params - The parameters object containing both path variable values and query parameters.
   * @returns {{finalEndpoint: string, queryParams: Object}} An object containing the final endpoint with replaced path placeholders and query parameters.
   */
  #prepareEndpoint(endpoint, params) {
    let finalEndpoint = endpoint
    const queryParams = {}

    Object.entries(params).forEach(([key, value]) => {
      // Check and replace path placeholders
      const pathPlaceholder = `{${key}}`
      if (finalEndpoint.includes(pathPlaceholder)) {
        finalEndpoint = finalEndpoint.replace(pathPlaceholder, encodeURIComponent(value))
      } else {
        queryParams[key] = value // Collect as query parameter
      }
    })

    // After replacing, check if any path placeholders are left unreplaced
    const remainingPathPlaceholders = finalEndpoint.match(/\{([^}]+)\}/g)
    if (remainingPathPlaceholders) {
      throw new Error(`Missing values for parameters: ${remainingPathPlaceholders.join(", ")}`)
    }

    return { finalEndpoint, queryParams }
  }

  /**
   * Signs a message using HMAC-SHA256 with the API secret and encodes it in base64.
   *
   * @param {string} message - The message to be signed.
   * @returns {string} The base64-encoded signature.
   */
  #signMessage(message) {
    return crypto.createHmac('sha256', this.#apiSecret)
      .update(message)
      .digest('base64')
  }

  /**
   * Generates authentication headers for Kucoin API requests.
   *
   * @param {string} endpoint - The API endpoint.
   * @param {string} method - The HTTP method (GET, POST, etc.).
   * @param {string} [body=""] - The request body for POST requests.
   * @returns {Object} The required headers for authenticated API requests.
   */
  #getAuthHeaders(endpoint, method, body = '') {
    const timestamp = Date.now().toString()
    const strToSign = `${timestamp}${method}${endpoint}${body}`
    const signature = this.#signMessage(strToSign)
    const passphrase = this.#signMessage(this.#apiPassphrase)

    return {
      'KC-API-SIGN': signature,
      'KC-API-TIMESTAMP': timestamp,
      'KC-API-KEY': this.#apiKey,
      'KC-API-PASSPHRASE': passphrase,
      'KC-API-KEY-VERSION': this.#apiKeyVersion
    }
  }
}
