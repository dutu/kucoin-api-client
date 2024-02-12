import axios from 'axios'

export class BaseWrapper {
  #apiKey
  #secret
  #client
  #baseURLs = {
    spot: `https://api.kucoin.com`,
    futures: 'https://api-futures.kucoin.com',
  }

  constructor({ apiKey, apiSecret }) {
    this.#apiKey = apiKey
    this.#secret = apiSecret
    this.#client = axios.create()
  }

  async makeRequest({ endpoint, method, baseUrl, requiresAuth = false, params = {} }) {
    // Replace path parameters and prepare query parameters
    const { finalEndpoint, queryParams } = this.#prepareEndpoint(endpoint, params)

    let url = `${this.#baseURLs[baseUrl]}${finalEndpoint}`
    if (Object.keys(queryParams).length > 0) {
      url += `?${this.#toQueryString(queryParams)}`
    }

    const options = {
      method,
      url,
      headers: {}
    }

    if (method !== 'GET' && params.bodyParams) {
      options.data = params.bodyParams
    }

    if (requiresAuth) {
      options.headers = this.#getAuthHeaders()
    }

    try {
      const response = await this.#client(options)
      return response.data
    } catch (error) {
      console.error(`API call failed: ${error}`)
      throw error
    }
  }

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
    });

    // After replacing, check if any path placeholders are left unreplaced
    const remainingPathPlaceholders = finalEndpoint.match(/\{([^}]+)\}/g)
    if (remainingPathPlaceholders) {
      throw new Error(`Missing values for parameters: ${remainingPathPlaceholders.join(", ")}`)
    }

    return { finalEndpoint, queryParams }
  }

  /**
   * Converts an object into a URL query string.
   * Each key-value pair in the object is URL-encoded and concatenated with '&' characters.
   *
   * @param {Object} params - The parameters object to be converted into a query string.
   * @returns {string} The URL-encoded query string.
   *
   * @example
   * // returns 'name=JohnDoe&age=30'
   * #toQueryString({ name: 'John Doe', age: 30 })
   */
  #toQueryString(params) {
    return Object.entries(params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&')
  }

  #getAuthHeaders() {
    // Implement authentication logic here
    // This is a placeholder for actual authentication header logic
    return {}
  }
}
