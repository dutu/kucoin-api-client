import { test } from 'node:test'
import assert from 'node:assert/strict'
import Kucoin from '../src/index.mjs'

const credentials = {
  apiKey: 'api-key',
  apiSecret: 'api-secret',
  apiPassphrase: 'api-passphrase',
  apiKeyVersion: '2',
}

test('public WebSocket clients can be created without credentials', () => {
  const kucoin = new Kucoin()

  for (const createClient of [kucoin.createSpotWebSocketClient, kucoin.createFuturesWebSocketClient]) {
    const client = createClient()
    assert.equal(typeof client.subscribe, 'function')
    assert.equal(typeof client.unsubscribe, 'function')
  }
})

test('WebSocket clients can still be created with credentials', () => {
  const kucoin = new Kucoin(credentials)

  assert.doesNotThrow(() => kucoin.createSpotWebSocketClient())
  assert.doesNotThrow(() => kucoin.createFuturesWebSocketClient())
})
