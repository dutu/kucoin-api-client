import uniqid from 'uniqid'
import { uniqueId } from '../utils/uniqueId.mjs'

/**
 * Subscribes to a specified topic with optional parameters within a given context.
 * The context includes logger, webSocket, and subPubManager to facilitate the subscription operation.
 * If the `type` field in the subscription object is provided, it must be "subscribe"; otherwise, an error is thrown.
 * The `id` is automatically generated if omitted.
 *
 * @param {Object} context - The context under which the subscription operation is executed.
 * @param {Object} context.logger - The logging instance to record the operation.
 * @param {Object} context.webSocket - The WebSocket connection instance.
 * @param {Object} context.subPubManager - The subscription and publication manager for handling topics.
 * @param {Object} subscription - The subscription details.
 * @param {number} [subscription.id=uniqid.time()] - The unique identifier for the subscription. Automatically generated if omitted.
 * @param {string} [subscription.type='subscribe'] - The type of subscription, defaults to "subscribe" if undefined.
 * @param {string} subscription.topic - The topic to subscribe to. Topics can support divisional subscription for multiple trading pairs through ",".
 * @param {boolean} [subscription.privateChannel=false] - Specifies whether to use a private channel. Defaults to false.
 * @param {boolean} [subscription.response=true] - Specifies whether the server should return receipt information for this subscription. Defaults to true.
 * @param {Function} callback - The callback function to execute when messages are received for the subscribed topic.
 *
 * @throws {Error} If the subscription type is not "subscribe" or undefined.
 *
 * @example
 * // Subscribe to multiple topics with a callback
 * subscribeWithContext({
 *   topic: "/market/ticker:BTC-USDT,ETH-USDT",
 *   privateChannel: true,
 *   response: true
 * }, (message) => {
 *   console.log(message)
 * })
 *
 * // This example assumes that `subscribeWithContext` is a version of `subscribe`
 * // that has been bound with the appropriate context (logger, webSocket, subPubManager).
 */
export function subscribe({ logger, webSocket, subPubManager }, subscription, callback) {
  const subscriptionToUse = {
    id: uniqueId(),
    type: 'subscribe',
    ...subscription,
  }

  if (subscriptionToUse.type !== 'subscribe') {
    throw new Error(`subscription.type ${subscriptionToUse.type} is not supported. Should be "subscribe" or undefined`)
  }

  subPubManager.subscribe(subscriptionToUse, callback)
  if (webSocket.isAvailable) {
    webSocket.send(subscriptionToUse)
  }
}
