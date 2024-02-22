import uniqid from 'uniqid'

/**
 * Generates a unique ID, optionally prefixed or suffixed
 *
 * @param {string} prefix - Optional prefix to prepend to the unique ID.
 * @param {string} suffix - Optional suffix to append to the unique ID.
 * @returns {string} The reversed unique ID.
 */
export function uniqueId(prefix = '', suffix = '') {
  const id = uniqid.time(prefix, suffix)
  // return reversed string
  return id.split('').reverse().join('')
}
