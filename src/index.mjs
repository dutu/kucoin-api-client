import { SpotTradingWrapper } from './rest/spotTradingWrapper.mjs'
import { AccountWrapper } from './rest/accountWrapper.mjs'
import { MarginTradingWrapper } from './rest/MarginTradingWrapper.mjs'
import { FuturesTradingWrapper } from './rest/FuturesTradingWrapper.mjs'

/**
 * Kucoin API client, providing access to various trading operations.
 * This client acts as a facade to the underlying API wrappers, abstracting the complexity
 * of individual API sections like account, spot trading, margin trading, and futures trading.
 */
class Kucoin {
  /**
   * Initializes the Kucoin API client with the provided credentials.
   * @param {Object} credentials - The API credentials needed for authenticated requests. Should contain API key, secret, and passphrase.
   */
  constructor(credentials) {
    this.account = new AccountWrapper(credentials, client)
    this.spotTrading = new SpotTradingWrapper(credentials, client)
    this.marginTrading = new MarginTradingWrapper(credentials, client)
    this.futuresTrading = new FuturesTradingWrapper(credentials, client)
  }
}
