import { test } from 'node:test'
import assert from 'node:assert/strict'
import net from 'node:net'
import http from 'node:http'
import https from 'node:https'
import tls from 'node:tls'
import axios from 'axios'
import { WebSocketServer } from 'ws'
import Kucoin from '../src/index.mjs'
import { createSocksAgent } from '../src/utils/socksAgent.mjs'

/**
 * Self-signed certificate for the fake KuCoin origin used by these tests. It is used
 * exclusively by the local test server, as is the (deliberately public) private key.
 */
const TEST_CERTIFICATE = `-----BEGIN CERTIFICATE-----
MIIDXzCCAkegAwIBAgIUAXwdrQXWMWvJOfOMqQ0TmvEBetYwDQYJKoZIhvcNAQEL
BQAwGTEXMBUGA1UEAwwOYXBpLmt1Y29pbi5jb20wHhcNMjYwOTI4MTYyNTAyWhcN
NDYwOTIzMTYyNTAyWjAZMRcwFQYDVQQDDA5hcGkua3Vjb2luLmNvbTCCASIwDQYJ
KoZIhvcNAQEBBQADggEPADCCAQoCggEBALO0YvPcq3oyCAl5aX4EjdcYXrchD4Kx
ECb35zoo3H2mrfw0bQuXG4XMIBfLE8YQRze7te1qlY6E4xo5KecUkiFMRkertdOe
igy3ke1b2D//1ZnQAhOv32yFWLqjoBDbV2vACTpAkdMt4IRARRa9upXcli954fY3
MxcSD7YGfnwhXOAKhcq006PUEnRUo4FFyaf6AFC54O5EhRElFHUD7VeOPUWRF4kw
EgPjXjeF4jf9RqRu2eHiYzyhy0iUkJtfyV3tal3FY536QaYOcokhQ3LFUFjEcoGd
HcpohNZUYCqvv903KypKm0qDYmkqAAYJ+d8sfNmYcLNdzxmOM6xBrqsCAwEAAaOB
njCBmzAdBgNVHQ4EFgQUQppt2C81pUQBKu4uXJu5QCL0AgwwHwYDVR0jBBgwFoAU
Qppt2C81pUQBKu4uXJu5QCL0AgwwDwYDVR0TAQH/BAUwAwEB/zBIBgNVHREEQTA/
gg5hcGkua3Vjb2luLmNvbYIWYXBpLWZ1dHVyZXMua3Vjb2luLmNvbYIVYXBpLWJy
b2tlci5rdWNvaW4uY29tMA0GCSqGSIb3DQEBCwUAA4IBAQCZML94UqQjnD3lT2No
+7p3HopHnzeR0KqgmTbyZo0r+wUIwKWELg0V3cqGoR7Tv211m3h+o2TI/ea9nfku
+UCjhfkouyQWMLRRXEbNRWbjdb9gyz3oGxPjTIWTbNlGaYel7leTgrFBxflfXFvc
78oBgmS5bHxKqr1ekRGBZmftSisTbnE4h4D79e6XPMD68CjN+XCawFFu1Q+reSKy
ll0Bb9uiWucOKTnE1wGBtmntI3ZnDO72otDckDKvdsJIbjZEkJq++iS6l8/zS+E6
jwBZdGLZe3ueOqXu/RiSAls+h9EbxgWZ47vTmEZ7DBEPuua4Z0Ap4kFbktBO6Sah
rTo0
-----END CERTIFICATE-----`

const TEST_PRIVATE_KEY = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCztGLz3Kt6MggJ
eWl+BI3XGF63IQ+CsRAm9+c6KNx9pq38NG0LlxuFzCAXyxPGEEc3u7XtapWOhOMa
OSnnFJIhTEZHq7XTnooMt5HtW9g//9WZ0AITr99shVi6o6AQ21drwAk6QJHTLeCE
QEUWvbqV3JYveeH2NzMXEg+2Bn58IVzgCoXKtNOj1BJ0VKOBRcmn+gBQueDuRIUR
JRR1A+1Xjj1FkReJMBID4143heI3/Uakbtnh4mM8octIlJCbX8ld7WpdxWOd+kGm
DnKJIUNyxVBYxHKBnR3KaITWVGAqr7/dNysqSptKg2JpKgAGCfnfLHzZmHCzXc8Z
jjOsQa6rAgMBAAECggEAJ+PFSVN0/vFnJk88kvwIzjO7JpRgoIaUSsohmh/i3cNn
gIHUqMt4kQkgIJf0AjWv0VfKCPLtUs79qF8DBafjzh9jxFoByQE6rJr8+f62sHIm
JHfvVhZmlmy9JuTWTZeavrDIe5VEqWdYHJM1otgnuEdYUR6RgXl8TkU0lpe3cO8I
kwz7QCkvD6j43Gz69FXv/DKV0pNVILPEGiyD6u5NYVAYtYKBPWdpSBtwD1Q192uW
IiOrIw2HotJDu51ubQKU3aFgxclrATVpHX4hmrBwrScPDP8y+zaGS+k3ugpjTh9c
9OjMwe22G9/b0f3JGzSL8zDyhG5OBc0J+jaR/JMtKQKBgQD6gP+ibmt2FyRkScPd
Np2ob9T/KQChULWMqAvFq33ht60E4m1QufeiAjc/oVB+hJKPjN9qrWoKSEEei5H/
+N6M6rRzjjoPnrvHkDfMe5Zn1sAcRbaeN4izjATFpbEcSWdySuQOMucucPEg0wUi
IVrfToktSoYw8YL2+/N1JH2WGQKBgQC3pbsWO4Doedj2uQCwKn2JwUoky88cHuJy
mZq35e5Sp6iFSV1KKvQlpdp36ngzukmqhf8+hHuty33VOTpiNGoh/Q0EGA0vFYGk
FWBovwxBO8i8F/EVhmLompd0ad8m+dP5IkSVXVcWsx8M8jZf5SpNItcI9/Jl+ip1
lSlFmzwbYwKBgQD5aSScsfnWetYl7/fOMYmpYacdYdKZyoToBYyrA8Ly0HC400Rp
wq7WpAQkG1XMkexmdqkfSoewsx367pWv2Taj8S83el0+nhlyaZnUwxwOSRe/Tn2z
a7F0qq05qG39ruwLNJt5s57Pc23w84lB4RncChK0gGW5J0zw4gwVDv7nSQKBgG2f
58MIuBWODr6QhuGiK5gcora+Vp5xrTk9igb2oUIDxOvzdFW+uEj07Smh9Cjkre61
2Dyodu+yxiWO6NQQd75cQPXNqakOjHm3LPq5+IXEOzpUjFwOAWLaTUh3nna0sR1J
oGkM89ygBgwDVgP+Vzb+ciBvaeoH4GqaJK3hUYsDAoGBAOFyyosJmhfG1rgLOQOr
k0FPzJdzmMePirKGAwB2/sFFgayelsFI7R2XFVSmPSUPu2uQo0Yg18UtRAIYrlbw
v1kSRTuf3qC84M1H4ZGwSU5OBahqdKspht28hhZxRO23Ue0w5WgVet8ly9BRFD9/
stDa6yyUF8V3jPecP5iHE74h
-----END PRIVATE KEY-----`

const credentials = { apiKey: 'test-api-key', apiSecret: 'test-api-secret', apiPassphrase: 'test-passphrase', apiKeyVersion: '2' }

// Header names which would reveal that the request was made through a proxy.
const proxyHeaderPatterns = [/^proxy-/i, /^via$/i, /^forwarded$/i, /^x-forwarded-/i, /^x-real-ip$/i]

function assertNoProxyHeaders(headers) {
  for (const name of Object.keys(headers)) {
    for (const pattern of proxyHeaderPatterns) {
      assert.ok(!pattern.test(name), `proxy related header '${name}' was introduced`)
    }
  }
}

function closeServer(server) {
  return new Promise((resolve) => {
    server.close(() => resolve())
    server.closeAllConnections?.()
  })
}

async function listen(server) {
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
  return server.address().port
}

/**
 * Determines the length of a SOCKS5 CONNECT request, or `undefined` when it is not complete yet.
 */
function socksRequestLength(buffer) {
  if (buffer.length < 4) return undefined

  const addressLength = { 1: 4, 3: 1 + buffer[4], 4: 16 }[buffer[3]]
  return addressLength === undefined ? undefined : 4 + addressLength + 2
}

/**
 * Starts a minimal SOCKS5 (RFC 1928) proxy without authentication, which tunnels every
 * connection to a fixed target. As the protocol is below HTTP, it can not add headers.
 */
async function startSocks5Proxy(targetPort) {
  const sockets = new Set()

  const server = net.createServer((socket) => {
    sockets.add(socket)
    socket.on('close', () => sockets.delete(socket))

    let buffer = Buffer.alloc(0)
    let stage = 'greeting'

    socket.on('data', (chunk) => {
      buffer = Buffer.concat([buffer, chunk])

      if (stage === 'greeting') {
        if (buffer.length < 2 + buffer[1]) return
        buffer = buffer.subarray(2 + buffer[1])
        socket.write(Buffer.from([0x05, 0x00])) // no authentication required
        stage = 'request'
      }

      if (stage === 'request') {
        const requestLength = socksRequestLength(buffer)
        if (requestLength === undefined || buffer.length < requestLength) return
        buffer = buffer.subarray(requestLength)
        stage = 'tunnel'

        const upstream = net.connect(targetPort, '127.0.0.1', () => {
          socket.write(Buffer.from([0x05, 0x00, 0x00, 0x01, 0, 0, 0, 0, 0, 0]))
          socket.pipe(upstream)
          upstream.pipe(socket)
          if (buffer.length) upstream.write(buffer)
        })
        upstream.on('error', () => socket.destroy())
        upstream.on('close', () => socket.destroy())
        socket.on('close', () => upstream.destroy())
      }
    })

    socket.on('error', () => {})
  })

  const port = await listen(server)
  return {
    port,
    close: async () => {
      // `net.Server` does not implement `closeAllConnections`, so the tunnels are destroyed explicitly.
      for (const socket of sockets) socket.destroy()
      await closeServer(server)
    },
  }
}

/**
 * Starts a plain HTTP server which records the headers of all received requests.
 */
async function startRecordingOrigin() {
  const requests = []
  const server = http.createServer((req, res) => {
    requests.push({ method: req.method, url: req.url, headers: req.headers })
    res.writeHead(200, { 'content-type': 'application/json' })
    res.end(JSON.stringify({ ok: true }))
  })
  const port = await listen(server)
  return { port, requests, close: () => closeServer(server) }
}

/**
 * Starts a fake KuCoin origin (HTTPS for the REST API, WebSocket for the streaming API),
 * which records the headers of all received requests and upgrades.
 */
async function startFakeKucoinOrigin() {
  const httpRequests = []
  const webSocketUpgrades = []
  let port

  const server = https.createServer({ cert: TEST_CERTIFICATE, key: TEST_PRIVATE_KEY }, (req, res) => {
    httpRequests.push({ method: req.method, url: req.url, headers: req.headers })

    if (req.url.startsWith('/api/v1/bullet')) {
      res.writeHead(200, { 'content-type': 'application/json' })
      res.end(JSON.stringify({
        code: '200000',
        data: {
          token: 'test-token',
          instanceServers: [{ endpoint: `wss://api.kucoin.com:${port}`, pingInterval: 10000, pingTimeout: 10000 }],
        },
      }))
      return
    }

    res.writeHead(200, {
      'content-type': 'application/json',
      'gw-ratelimit-limit': '100',
      'gw-ratelimit-remaining': '99',
      'gw-ratelimit-reset': '1000',
    })
    res.end(JSON.stringify({ code: '200000', data: { symbol: req.url, tunnelled: true } }))
  })

  const webSocketServer = new WebSocketServer({ server })
  webSocketServer.on('connection', (socket, req) => {
    webSocketUpgrades.push(req.headers)
    const connectId = new URL(req.url, 'https://api.kucoin.com').searchParams.get('connectId')
    socket.send(JSON.stringify({ type: 'welcome', id: connectId }))
  })

  port = await listen(server)
  return { port, httpRequests, webSocketUpgrades, close: () => closeServer(server) }
}

/**
 * Resolves `true` when the event is emitted before the timeout expires, `false` otherwise.
 */
function waitForEvent(emitter, eventName, timeoutMs) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(false), timeoutMs)
    emitter.once(eventName, () => {
      clearTimeout(timer)
      resolve(true)
    })
  })
}

// TLS verifications of the fake origin are only possible when the default CA store can be extended.
const canTrustTestCertificate = typeof tls.setDefaultCACertificates === 'function' &&
  typeof tls.getCACertificates === 'function'

if (canTrustTestCertificate) {
  tls.setDefaultCACertificates([...tls.getCACertificates('default'), TEST_CERTIFICATE])
}

test('socksProxyUri validation fails closed', () => {
  const invalidValues = [
    ['an empty string', ''],
    ['a whitespace only string', '   '],
    ['null', null],
    ['zero', 0],
    ['false', false],
    ['NaN', Number.NaN],
    ['a number', 12345],
    ['an object', {}],
    ['an array', ['socks5://user:password@127.0.0.1:1080']],
    ['a URL instance', new URL('socks5://user:password@127.0.0.1:1080')],
    ['a function', () => {}],
    ['an unparseable URI', 'not a uri'],
    ['an unsupported protocol', 'http://127.0.0.1:1080'],
    ['a missing host', 'socks5://'],
    ['missing proxy host', 'socks5://user:password@'],
    ['a missing port', 'socks5://127.0.0.1'],
    ['a missing authenticated proxy port', 'socks5h://user:password@127.0.0.1'],
    ['an empty port', 'socks5://127.0.0.1:'],
    ['port zero', 'socks5://127.0.0.1:0'],
  ]

  for (const [label, socksProxyUri] of invalidValues) {
    assert.throws(() => createSocksAgent(socksProxyUri), Error, `expected ${label} to be rejected`)
    assert.throws(() => new Kucoin({}, { socksProxyUri }), Error, `expected constructing with ${label} to throw`)
  }

  // Only an omitted value (or `undefined`) selects a direct connection.
  assert.equal(createSocksAgent(), undefined)
  assert.equal(createSocksAgent(undefined), undefined)
  assert.doesNotThrow(() => new Kucoin({}, {}))
  assert.doesNotThrow(() => new Kucoin({}, { socksProxyUri: undefined }))

  assert.ok(createSocksAgent('socks5h://127.0.0.1:9050'))
  assert.ok(createSocksAgent('socks://127.0.0.1:1'))
  assert.ok(createSocksAgent('socks4://127.0.0.1:65535'))
  assert.ok(createSocksAgent('  socks5://user:password@127.0.0.1:1080  '))
  assert.throws(() => createSocksAgent('socks5://127.0.0.1'), /serviceConfig\.socksProxyUri:.*port/)
})

test('socksProxyUri errors never expose the configured value', () => {
  const password = 'S3cr3t-pw'
  const malformedUris = [
    // A missing '//' previously leaked the credentials in the "missing host" message.
    [`socks5:user:${password}@127.0.0.1:1080`, password],
    // A '/' in the password previously defeated the credential masking.
    ['socks5://user:S3/cr3t@127.0.0.1:1080', 'S3/cr3t'],
    [`socks5://user:${password}@`, password],
    [`socks5://user:${password}@127.0.0.1`, password],
    [`http://user:${password}@127.0.0.1:1080`, password],
    [`socks5://user:${password}@[::1`, password],
    [`socks5://user:${password}@127.0.0.1:notaport`, password],
    [`not a uri carrying ${password}`, password],
  ]

  for (const [socksProxyUri, exposedValue] of malformedUris) {
    for (const create of [() => createSocksAgent(socksProxyUri), () => new Kucoin({}, { socksProxyUri })]) {
      let message
      try {
        create()
      } catch (error) {
        message = error.message
      }

      assert.ok(message, 'expected the configuration to be rejected')
      assert.match(message, /serviceConfig\.socksProxyUri/, `expected the field to be named in: ${message}`)
      assert.ok(!message.includes(exposedValue), `error message exposed the credentials: ${message}`)
      assert.ok(!message.includes(socksProxyUri), `error message exposed the configured value: ${message}`)
    }
  }
})

test('proxied requests are header-identical to direct requests', async (t) => {
  const origin = await startRecordingOrigin()
  const socks = await startSocks5Proxy(origin.port)
  t.after(async () => {
    await socks.close()
    await origin.close()
  })

  const url = `http://127.0.0.1:${origin.port}/api/v1/timestamps?x=1`
  // Same configuration as the one used by BaseWrapper.makeRequest
  await axios({ method: 'GET', url, headers: {}, timeout: 5000, proxy: false })

  const agent = createSocksAgent(`socks5h://127.0.0.1:${socks.port}`)
  await axios({ method: 'GET', url, headers: {}, timeout: 5000, proxy: false, httpAgent: agent, httpsAgent: agent })

  const [direct, proxied] = origin.requests
  assert.equal(origin.requests.length, 2)
  assert.equal(direct.url, proxied.url)
  assertNoProxyHeaders(proxied.headers)
  assert.equal(proxied.headers.connection, https.globalAgent.keepAlive ? 'keep-alive' : 'close')
  assert.deepEqual(proxied.headers, direct.headers)
})

test('REST and WebSocket requests are routed through the proxy without header changes', { skip: !canTrustTestCertificate && 'requires Node.js with tls.setDefaultCACertificates (>= 22.9)' }, async (t) => {
  const origin = await startFakeKucoinOrigin()
  const socks = await startSocks5Proxy(origin.port)
  t.after(async () => {
    await socks.close()
    await origin.close()
  })

  const kucoin = new Kucoin(credentials, { socksProxyUri: `socks5h://127.0.0.1:${socks.port}` })

  const result = await kucoin.account.account.getAccountInfo()
  assert.equal(result.data.tunnelled, true)

  const restHeaders = origin.httpRequests.at(-1).headers
  assert.equal(restHeaders.host, 'api.kucoin.com')
  assert.equal(restHeaders.connection, https.globalAgent.keepAlive ? 'keep-alive' : 'close')
  assert.equal(restHeaders['kc-api-key'], credentials.apiKey)
  assertNoProxyHeaders(restHeaders)

  const webSocketClient = kucoin.createSpotWebSocketClient()
  webSocketClient.connect()
  const isAvailable = await waitForEvent(webSocketClient, 'available', 5000)
  webSocketClient.close()
  assert.ok(isAvailable, 'expected the WebSocket to become available through the proxy')

  const upgradeHeaders = origin.webSocketUpgrades.at(-1)
  assert.ok(upgradeHeaders, 'expected the proxy to tunnel the WebSocket handshake')
  assert.equal(upgradeHeaders.host, `api.kucoin.com:${origin.port}`)
  assert.equal(upgradeHeaders.connection, 'Upgrade')
  assert.equal(upgradeHeaders.upgrade, 'websocket')
  assertNoProxyHeaders(upgradeHeaders)
})

test('unreachable proxy results in failed requests, without a direct connection', async (t) => {
  const origin = await startFakeKucoinOrigin()
  t.after(() => origin.close())

  const kucoin = new Kucoin(credentials, { socksProxyUri: 'socks5h://127.0.0.1:1' })

  await assert.rejects(() => kucoin.spot.market.getSymbol({ symbol: 'BTC-USDT' }))

  const webSocketClient = kucoin.createSpotWebSocketClient()
  webSocketClient.connect()
  const isAvailable = await waitForEvent(webSocketClient, 'available', 2000)
  webSocketClient.close()
  assert.equal(isAvailable, false)

  assert.equal(origin.httpRequests.length, 0)
  assert.equal(origin.webSocketUpgrades.length, 0)
})
