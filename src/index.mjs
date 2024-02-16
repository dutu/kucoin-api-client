import EventEmitter from 'eventemitter3'
import { SpotTradingWrapper } from './rest/spotTradingWrapper.mjs'
import { AccountWrapper } from './rest/accountWrapper.mjs'
import { MarginTradingWrapper } from './rest/MarginTradingWrapper.mjs'
import { FuturesTradingWrapper } from './rest/FuturesTradingWrapper.mjs'

/**
 * Kucoin API client, providing access to various trading operations.
 * This client acts as a facade to the underlying API wrappers, abstracting the complexity
 * of individual API sections like account, spot trading, margin trading, and futures trading.
 */
export class Kucoin extends EventEmitter {
  /**
   * Initializes the Kucoin API client with the provided credentials. If any credential is provided,
   * all credentials (apiKey, apiSecret, apiPassphrase, apiKeyVersion) must be provided.
   * This setup is necessary for authenticated requests, while public API calls do not require credentials.
   *
   * @param {Object} [credentials={}] - The API credentials needed for authenticated requests.
   * @param {string} [credentials.apiKey] - The API key.
   * @param {string} [credentials.apiSecret] - The API secret.
   * @param {string} [credentials.apiPassphrase] - The passphrase specified when the API key was created.
   * @param {string} [credentials.apiKeyVersion] - The version of the API key.
   * @throws {Error} If some but not all API credentials are provided.
   */
  constructor({ apiKey, apiSecret, apiPassphrase, apiKeyVersion } = {}) {
    super()
    // Check for partial credentials
    const credentialsList = [apiKey, apiSecret, apiPassphrase, apiKeyVersion]
    const credentialsProvided = credentialsList.filter(cred => cred !== undefined)
    if (credentialsProvided.length > 0 && credentialsProvided.length < credentialsList.length) {
      throw new Error('All API credentials (apiKey, apiSecret, apiPassphrase, apiKeyVersion) must be provided or none at all.')
    }

    const credentials = credentialsProvided.length > 0 ? { apiKey, apiSecret, apiPassphrase, apiKeyVersion } : undefined
    const serviceConfig = {
      eventEmitter: this,
    }

    this.account = new AccountWrapper(credentials, serviceConfig)
    this.spotTrading = new SpotTradingWrapper(credentials, serviceConfig)
    this.marginTrading = new MarginTradingWrapper(credentials, serviceConfig)
    this.futuresTrading = new FuturesTradingWrapper(credentials, serviceConfig)
  }
}

export default Kucoin
