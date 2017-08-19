function set(keys, apply) {
  var key = keys[0]
  var nextKeys = keys.slice(1)
  return function (state) {
    var partial;
    var resultValue = keys.length < 2
      ? apply(state[key])
      : set(nextKeys, apply)(state[key])

    if (Array.isArray(state)) {
      return state.slice(0, key)
        .concat([resultValue], state.slice(key+1))
    }

    partial = {}
    partial[key] = resultValue
    return Object.assign({}, state, partial)
  }
}


/**
 * takes a list of updates to apply to state
 * @param {Object} state state to update
 * @param {Array.<(Array|string|function)>} updates an
 * @returns {Object} Updated state
 */
export function deepUpdate(state, updates) {
  if (!Array.isArray(updates[0])) updates = [updates]

  for(var i = 0; i < updates.length; i++) {
    var update = updates[i]
    var apply = update.slice(-1)[0]
    var keys = update.slice(0, -1)
    state = set(keys, apply)(state)
  }
  return state
}