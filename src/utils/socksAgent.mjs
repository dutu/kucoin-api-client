import https from 'node:https'
import { SocksProxyAgent } from 'socks-proxy-agent'

const supportedProtocols = new Set(['socks:', 'socks4:', 'socks4a:', 'socks5:', 'socks5h:'])

/**
 * Creates a SOCKS proxy agent for the given proxy URI.
 *
 * The URI is validated eagerly, so that a client configured with an invalid proxy can not
 * be created: without an agent the client would silently connect directly, bypassing the proxy.
 * A proxy which is unreachable or not responding results in failed requests/connections, as
 * there is no fallback to a direct connection.
 *
 * Only `undefined` (or omitting the configuration) selects a direct connection. Any other value
 * must be a valid SOCKS proxy URI string, otherwise an error is thrown. Error messages never
 * contain the configured value, as it may carry proxy credentials.
 *
 * @param {string} [socksProxyUri] - The SOCKS proxy URI (e.g. 'socks5h://127.0.0.1:9050').
 *   Supported protocols are socks, socks4, socks4a, socks5 and socks5h; surrounding whitespace is
 *   ignored. An explicit port from 1 to 65535 is required. When `undefined`, no proxy is used.
 * @returns {import('socks-proxy-agent').SocksProxyAgent|undefined} The proxy agent, or `undefined` when no URI was provided.
 * @throws {Error} If the value is not a string, is empty, is malformed, uses an unsupported protocol,
 *   or has no host or valid port.
 */
export function createSocksAgent(socksProxyUri) {
  if (socksProxyUri === undefined) {
    return undefined
  }

  if (typeof socksProxyUri !== 'string') {
    const receivedType = socksProxyUri === null ? 'null' : typeof socksProxyUri
    throw new Error(`Invalid serviceConfig.socksProxyUri: expected a string, got ${receivedType}`)
  }

  const proxyUri = socksProxyUri.trim()
  if (!proxyUri) {
    throw new Error('Invalid serviceConfig.socksProxyUri: the proxy URI must not be empty')
  }

  let proxyUrl
  try {
    proxyUrl = new URL(proxyUri)
  } catch {
    throw new Error('Invalid serviceConfig.socksProxyUri: not a valid URI')
  }

  if (!supportedProtocols.has(proxyUrl.protocol)) {
    throw new Error(`Unsupported protocol in serviceConfig.socksProxyUri: '${proxyUrl.protocol}' (supported: socks, socks4, socks4a, socks5, socks5h)`)
  }

  if (!proxyUrl.hostname) {
    throw new Error('Invalid serviceConfig.socksProxyUri: missing proxy host')
  }

  if (!proxyUrl.port || proxyUrl.port === '0') {
    throw new Error('Invalid serviceConfig.socksProxyUri: a proxy port from 1 to 65535 is required')
  }

  try {
    // Mirror the default agent used for direct requests, so that requests made through the proxy
    // are indistinguishable from direct requests at the HTTP protocol level. Without this, the
    // proxied requests would send a 'Connection: close' header instead of 'Connection: keep-alive'.
    return new SocksProxyAgent(proxyUrl, { keepAlive: https.globalAgent.keepAlive })
  } catch {
    // The error from the SOCKS library is not propagated, as it may contain the proxy URI.
    throw new Error('Invalid serviceConfig.socksProxyUri: unsupported SOCKS proxy URI')
  }
}
