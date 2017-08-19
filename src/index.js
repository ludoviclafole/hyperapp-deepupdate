import { deepUpdate } from './deepUpdate'

function resolve(state, actions, result) {
  if (Array.isArray(result)) {
    return deepUpdate(state, result)
  }

  // Support for thunk
  if (typeof result === "function") {
    return function(update) {
      return result(function(next) {
        return update(resolve(state, actions, next))
      })
    }
  }

  return result
}

/**
 * deep update mixin
 * @returns {{events: {resolve: resolve}}}
 */
export function deepUpdateMixin() {
  return {
    events: {
      resolve: resolve
    }
  }
}