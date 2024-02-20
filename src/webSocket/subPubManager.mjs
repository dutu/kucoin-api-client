/**
 * Creates a Pub/Sub manager for managing message distribution and subscription tracking.
 * This manager supports both simple and aggregated (divisional) subscriptions,
 * and is designed for use cases like managing WebSocket subscriptions, including handling reconnections.
 *
 * @returns {Object} An object with methods to subscribe, unsubscribe, handle incoming messages, and retrieve topics for resubscription.
 */
export function createPubSubManager() {

  // Message Distribution Management
  const messageDistributor = (() => {
    const subscriptionRequestIds = {}
    const subscriptions = {}

    /**
     * Registers a subscription callback for a given topic.
     */
    function registerSubscription({ id, topic }, callback) {
      subscriptionRequestIds[id] = callback
      subscriptions[topic] ??= new Set()
      subscriptions[topic].add(id)
    }

    /**
     * Unregisters a subscription callback from a given topic.
     */
    function unregisterSubscription({ id, topic }) {
      delete subscriptionRequestIds[id]
      if (subscriptions[topic]) {
        subscriptions[topic].delete(id)
        if (subscriptions[topic].size === 0) {
          delete subscriptions[topic]
        }
      }
    }

    /**
     * Distributes a message to all subscribed callbacks for the message's topic.
     */
    function distributeMessage(data) {
      const { id, topic } = data
      if (subscriptionRequestIds[id]) {
        const callback = subscriptionRequestIds[id]
        if (callback) {
          callback(data)
        }

        return
      }

      if (subscriptions[topic]) {
        subscriptions[topic].forEach((id) => {
          const callback = subscriptionRequestIds[id]
          if (callback) {
            callback(data)
          }
        })
      }
    }

    return { registerSubscription, unregisterSubscription, distributeMessage }
  })()

  const subscriptionManager = (() => {
    const subscriptions = new Map()
    function addSubscription(subscription) {
      subscriptions.set(subscription.id, subscription)
    }

    function deleteSubscription(subscription) {
      const { id, topic } = subscription
      if (subscriptions.get(id)?.topic !== topic) {
        throw new Error(`Subscription id ${id} with topic ${topic} doesn't exist.`)
      }

      subscriptions.delete(id)
    }

    function getSubscriptions() {
      return Array.from(subscriptions.values())
    }

    return { addSubscription, deleteSubscription, getSubscriptions }
  })()

  /**
   * Subscribes to a given topic with a callback. Supports both simple and aggregated subscriptions.
   * @param {Object} subscription - An object containing subscription details, including id and topic.
   * @param {Function} callback - Callback function to execute when a message for the topic is received.
   */
  function subscribe(subscription, callback) {
    const { id, topic } = subscription
    subscriptionManager.addSubscription(subscription)

    if (topic.includes(',')) {
      const baseTopic = topic.split(':')[0]
      const identifiers = topic.split(':')[1].split(',')
      identifiers.forEach(identifier => {
        messageDistributor.registerSubscription({ id, topic: `${baseTopic}:${identifier}` }, callback)
      })
    } else {
      messageDistributor.registerSubscription({ id, topic }, callback)
    }
  }

  /**
   * Unsubscribes from a given topic. Supports unsubscribing from both simple and aggregated subscriptions.
   * @param {Object} subscription - An object containing subscription details to be removed, including id and topic.
   */
  function unsubscribe(subscription) {
    const { id, topic } = subscription
    subscriptionManager.deleteSubscription(subscription)

    if (topic.includes(',')) {
      const baseTopic = topic.split(':')[0]
      const identifiers = topic.split(':')[1].split(',')
      identifiers.forEach(identifier => {
        messageDistributor.unregisterSubscription({ id, topic: `${baseTopic}:${identifier}` })
      })
    } else {
      messageDistributor.unregisterSubscription({ id, topic })
    }
  }

  function onMessage(data) {
    messageDistributor.distributeMessage(data)
  }

  function getSubscriptions() {
    return subscriptionManager.getSubscriptions()
  }

  return { subscribe, unsubscribe, onMessage, getSubscriptions }
}
