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
      const { id } = subscription
      subscriptions.delete(id)
    }

    function getSubscriptions() {
      return Array.from(subscriptions.values())
    }

    /**
     * Retrieves subscription IDs for a given topic.
     */
    function getSubscriptionsByTopic(topic) {
      const subscriptionsByTopic = []
      subscriptions.forEach((subscription) => {
        if (subscription.topic === topic) {
          subscriptionsByTopic.push(subscription)
        }
      })
      return subscriptionsByTopic
    }

    /**
     * Retrieves the subscription for a given id.
     */
    function getSubscriptionById(id) {
      const subscriptions = getSubscriptions()
      return subscriptions.find((subscription) => subscription.id === id)
    }

    return { addSubscription, deleteSubscription, getSubscriptions, getSubscriptionsByTopic, getSubscriptionById }
  })()

  /**
   * Handles aggregated subscriptions by splitting the topic string and applying the given action.
   */
  function handleAggregatedSubscriptions({ id, aggregatedTopic }, callback, action) {
    const [baseTopic, identifiersStr] = aggregatedTopic.split(':')
    const identifiers = identifiersStr.split(',')
    identifiers.forEach(identifier => {
      const topic = `${baseTopic}:${identifier}`
      action({ id, topic }, callback)
    })
  }

  /**
   * Subscribes to a given topic with a callback. Supports both simple and aggregated subscriptions.
   */
  function subscribe(subscription, callback) {
    const { id, topic } = subscription

    if (!(topic && id)) {
      throw new Error(`Subscription id and topic are required`)
    }

    subscriptionManager.addSubscription(subscription)

    // Check if the subscription is for aggregated topics (indicated by a comma in the topic string)
    if (topic.includes(',')) {
      // For aggregated subscriptions, use handleAggregatedSubscriptions to split the topic into individual topics and register each separately
      handleAggregatedSubscriptions({ id, aggregatedTopic: topic }, callback, messageDistributor.registerSubscription)
    } else {
      messageDistributor.registerSubscription({ id, topic }, callback)
    }
  }

  /**
   * Unsubscribes from a given topic. Supports unsubscribing from both simple and aggregated subscriptions.
   */
  function unsubscribe(subscription) {
    const { id, topic } = subscription

    if (id && topic) {
      const subscription = subscriptionManager.getSubscriptionById(id)
      if (subscription && subscription.topic !== topic) {
        throw new Error(`Subscription id ${id} with topic ${topic} doesn't exist`)
      }
    }

    subscriptionManager.deleteSubscription(subscription)

    // Check if the subscription is for aggregated topics (indicated by a comma in the topic string)
    if (topic.includes(',')) {
      // For aggregated subscriptions, use handleAggregatedSubscriptions to split the topic into individual topics and unregister each separately
      handleAggregatedSubscriptions({ id, aggregatedTopic: topic }, null, messageDistributor.unregisterSubscription)
    } else {
      messageDistributor.unregisterSubscription({ id, topic })
    }
  }

  return {
    subscribe,
    unsubscribe,
    distributeMessage: messageDistributor.distributeMessage,
    getSubscriptions: subscriptionManager.getSubscriptions,
    getSubscriptionsByTopic: subscriptionManager.getSubscriptionsByTopic,
    getSubscriptionById: subscriptionManager.getSubscriptionById,
  }
}
