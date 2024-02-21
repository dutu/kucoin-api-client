/**
 * Unsubscribes from a specified topic or a specific subscription by its ID within a given context.
 * The context includes webSocket, logger, and subPubManager to facilitate the operation.
 * If the `type` field in the subscription object is provided, it must be "unsubscribe"; otherwise, an error is thrown.
 * If an `id` is not provided, the function attempts to unsubscribe from all subscriptions matching the provided `topic`.
 * Private topics can be unsubscribed from by setting the `privateChannel` parameter to true.
 *
 * @param {Object} context - The context under which the unsubscribe operation is executed.
 * @param {Object} context.logger - The logging instance to record the operation.
 * @param {Object} context.webSocket - The WebSocket connection instance.
 * @param {Object} context.subPubManager - The subscription and publication manager for handling topics.
 * @param {Object} subscription - The subscription details to unsubscribe from.
 * @param {number} [subscription.id] - The unique identifier for the subscription. If omitted,
 * all subscriptions for the provided topic will be unsubscribed.
 * @param {string} [subscription.type='unsubscribe'] - The type of subscription, should be "unsubscribe" or undefined.
 * @param {string} subscription.topic - The topic to unsubscribe from. Required if `id` is not provided.
 * @param {boolean} [subscription.privateChannel=false] - Specifies whether to unsubscribe from a private channel.
 * Set to true to unsubscribe from related private channel push.
 *
 * @throws {Error} If the subscription type is not "unsubscribe" or undefined.
 * @throws {Error} If `id` is specified and there is no subscription matching the `id` and `topic`, or if `topic` is
 * required but not provided.
 *
 * @example
 * // Unsubscribe from a specific subscription by ID
 * unsubscribe({
 *   logger: loggerInstance,
 *   webSocket: webSocketInstance,
 *   subPubManager: subPubManagerInstance
 * }, {
 *   id: 12345,
 *   type: 'unsubscribe',
 *   privateChannel: true
 * })
 *
 * @example
 * // Unsubscribe from all subscriptions for a given topic, including private channels
 * unsubscribe({
 *   logger: loggerInstance,
 *   webSocket: webSocketInstance,
 *   subPubManager: subPubManagerInstance
 * }, {
 *   topic: "/market/ticker:BTC-USDT",
 *   type: 'unsubscribe',
 *   privateChannel: true
 * })
 */
export function unsubscribe ({ logger, webSocket, subPubManager }, subscription) {
  const log = logger
  const subscriptionToUse = {
    type: 'unsubscribe', // Default value set, if type is not provided
    ...subscription,
  }

  if (subscriptionToUse.type !== 'unsubscribe') {
    throw new Error(`subscription.type ${subscriptionToUse.type} is not supported. Should be "unsubscribe" or undefined`)
  }

  const { id, topic } = subscriptionToUse

  // Ensuring topic is provided if id is not
  if (!id && !topic) {
    throw new Error('A topic is required when id is not provided.')
  }


  let subscriptionsRegistered
  if (id) {
    let subscription = subPubManager.getSubscriptionById(id)
    subscriptionsRegistered = subscription ? [subscription] : []
  } else {
    subscriptionsRegistered = subPubManager.getSubscriptionsByTopic(topic)
  }

  if (subscriptionsRegistered.length === 0) {
    log.warn(`No subscriptions registered to unsubscribe with\n${JSON.stringify(subscription)}`)
  }

  subscriptionsRegistered.forEach((subscriptionRegistered) => {
    const subscriptionToUnsubscribe = { ...subscriptionRegistered, ...subscriptionToUse }

    if (webSocket.isAvailable) {
      webSocket.send(subscriptionToUnsubscribe)
    }

    subPubManager.unsubscribe(subscriptionToUnsubscribe)
  })
}
