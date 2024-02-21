import { SpotTradingWrapper } from './rest/spotTradingWrapper.mjs'
import { AccountWrapper } from './rest/accountWrapper.mjs'
import { MarginTradingWrapper } from './rest/MarginTradingWrapper.mjs'
import { FuturesTradingWrapper } from './rest/FuturesTradingWrapper.mjs'
import { createWebSocketClient } from './webSocket/webSocketClient.mjs'
import { noop } from './utils/noop.mjs'
import { WebSocketConnectWrapper } from './rest/webSocketConnectWrapper.mjs'

/**
 * Kucoin API client, providing access to various trading operations.
 * This client acts as a facade to the underlying API wrappers, abstracting the complexity
 * of individual API sections like account, spot trading, margin trading, and futures trading.
 */

/**
 * @typedef {Object} Credentials
 * @property {string} [apiKey] - The API key.
 * @property {string} [apiSecret] - The API secret.
 * @property {string} [apiPassphrase] - The passphrase specified when the API key was created.
 * @property {string} [apiKeyVersion] - The version of the API key.
 */

/**
 * @typedef {Object} Logger
 * @property {Function} [emerg] - Emergency: system is unusable.
 * @property {Function} [alert] - Alert: action must be taken immediately.
 * @property {Function} [crit] - Critical: critical conditions.
 * @property {Function} [error] - Error: error conditions.
 * @property {Function} [warning] - Warning: warning conditions.
 * @property {Function} [notice] - Notice: normal but significant condition.
 * @property {Function} [info] - Informational: informational messages.
 * @property {Function} [debug] - Debug: debug-level messages.
 */

export class Kucoin {
  /**
   * Initializes the Kucoin API client with the provided credentials and service configuration.
   * If any credential is provided, all credentials (apiKey, apiSecret, apiPassphrase, apiKeyVersion) must be provided.
   * This setup is necessary for authenticated requests, while public API calls do not require credentials.
   * The `serviceConfig` parameter allows for custom configuration of the client, including logging based on syslog levels.
   *
   * @param {Credentials} [credentials={}] - The API credentials needed for authenticated requests.
   * @param {Object} [serviceConfig={}] - Configuration for additional service features.
   * @param {Function} [serviceConfig.onApiCallRateInfo] - Callback for API call rate info.
   * @param {Logger} [serviceConfig.logger={}] - Logger configuration with methods for different syslog levels.
   * @throws {Error} If some but not all API credentials are provided.
   *
   * @example
   * const kucoinClient = new Kucoin({
   *   apiKey: 'your_api_key',
   *   apiSecret: 'your_api_secret',
   *   apiPassphrase: 'your_api_passphrase',
   *   apiKeyVersion: '2'
   * }, {
   *   onApiCallRateInfo: (info) => console.log(info),
   *   logger: {
   *     emerg: (msg) => console.log(`[EMERGENCY] ${msg}`),
   *     alert: (msg) => console.log(`[ALERT] ${msg}`),
   *     crit: (msg) => console.log(`[CRITICAL] ${msg}`),
   *     error: (msg) => console.log(`[ERROR] ${msg}`),
   *     warning: (msg) => console.log(`[WARNING] ${msg}`),
   *     notice: (msg) => console.log(`[NOTICE] ${msg}`),
   *     info: (msg) => console.log(`[INFO] ${msg}`),
   *     debug: (msg) => console.log(`[DEBUG] ${msg}`),
   *   }
   * })
   */
  constructor(credentials = {}, serviceConfig = {}) {
    // Partial credentials check
    const requiredCredentials = ['apiKey', 'apiSecret', 'apiPassphrase', 'apiKeyVersion']
    const undefinedCount = requiredCredentials.filter(key => credentials[key] === undefined).length
    if (undefinedCount !== 0 && undefinedCount !== requiredCredentials.length) {
      throw new Error('All API credentials (apiKey, apiSecret, apiPassphrase, apiKeyVersion) must be provided or none at all.')
    }

    const credentialsToUse = undefinedCount === 0 ? credentials : undefined

    // Ensuring 'logger' is correctly referenced from 'serviceConfig'
    const logger = serviceConfig.logger
    const loggerToUse = {
      emerg: logger?.emerg?.bind(logger) || noop,
      alert: logger?.alert?.bind(logger) || noop,
      crit: logger?.crit?.bind(logger) || noop,
      error: logger?.error?.bind(logger) || noop,
      warning: logger?.warning?.bind(logger) || noop,
      notice: logger?.notice?.bind(logger) || noop,
      info: logger?.info?.bind(logger) || noop,
      debug: logger?.debug?.bind(logger) || noop,
    }

    const onApiCallRateInfoToUse = serviceConfig.onApiCallRateInfo || noop

    const serviceConfigToUse = {
      ...serviceConfig,
      logger: loggerToUse,
      onApiCallRateInfo: onApiCallRateInfoToUse,
    }

    // Instantiate wrapper classes with either the complete credentials or undefined
    this.account = new AccountWrapper(credentialsToUse, serviceConfigToUse)
    this.spotTrading = new SpotTradingWrapper(credentialsToUse, serviceConfigToUse)
    this.marginTrading = new MarginTradingWrapper(credentialsToUse, serviceConfigToUse)
    this.futuresTrading = new FuturesTradingWrapper(credentialsToUse, serviceConfigToUse)
    this.createSpotWebSocketClient = () => createWebSocketClient(credentialsToUse, serviceConfigToUse, 'spot')
    this.createFuturesWebSocketClient = () => createWebSocketClient(credentialsToUse, serviceConfigToUse, 'futures')
  }
}

export default Kucoin
