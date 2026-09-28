# kucoin-api-client

KuCoin API client for REST and WebSocket API.

## Usage

```js
import Kucoin from 'kucoin-api-client'

const kucoin = new Kucoin(
  {
    apiKey: 'your_api_key',
    apiSecret: 'your_api_secret',
    apiPassphrase: 'your_api_passphrase',
    apiKeyVersion: '2',
  },
  {
    socksProxyUri: 'socks5h://127.0.0.1:9050',
  },
)

const ticker = await kucoin.spot.market.getTicker({ symbol: 'BTC-USDT' })
```

### SOCKS proxy

`serviceConfig.socksProxyUri` routes all traffic through a SOCKS proxy: every REST request
(account, spot, margin, futures and the WebSocket connect-token requests) as well as every
WebSocket connection (public and private spot/futures clients, and the orderbook subscriptions).
The proxy is Node.js only; browsers using `isomorphic-ws` ignore the agent.

Supported protocols are `socks://`, `socks4://`, `socks4a://`, `socks5://` and `socks5h://`; the port
defaults to `1080` when omitted. The `socks5h://` and `socks://` protocols resolve the target host
name at the proxy, while `socks5://` resolves it locally.

```js
const kucoin = new Kucoin(credentials, {
  socksProxyUri: 'socks5h://user:password@127.0.0.1:9050',
})
```

The proxy is the only network path used:

- Only omitting `socksProxyUri` (or passing `undefined`) connects directly. Any other value must be
  a non-empty SOCKS proxy URI string (surrounding whitespace is ignored); an empty value, a
  non-string value, a malformed URI, an unsupported protocol or a missing proxy host throws when
  constructing the client, so it can not be created with an invalid proxy.
- An unreachable or non-responsive proxy results in failed requests and failed WebSocket connection
  attempts; there is no fallback to a direct connection.
- Environment based proxies (`HTTPS_PROXY`, `ALL_PROXY`, ...) are ignored for requests made by this
  client, so they can not override `socksProxyUri`.
- Errors name the `serviceConfig.socksProxyUri` field and the problem, but never include the
  configured value, as it may carry proxy credentials.

The proxy is transparent: it adds no headers and does not modify the request, so a proxied request
is indistinguishable from a direct request (including the `Connection` header). Credentials embedded
in `socksProxyUri` are exchanged with the proxy during the SOCKS handshake and are never sent in an
HTTP header.

When `socksProxyUri` is not provided, requests and WebSocket connections are made directly.
