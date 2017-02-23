import ActionTypes from '../../redux/action_types.json';

/**
 * Adds a new comparison tab
 */
export function addNewComparison() {
  return {
    type: ActionTypes.ADD_PERF_TAB,
  };
}

/**
 * Saves comparison tab configuration
 */
export function saveComparison(id, newState) {
  return {
    type: ActionTypes.SAVE_PERF_TAB,
    payload: {
      id,
      newState,
    },
  };
}

/**
 * Kicks off request process to get data from API
 */
export function fetchUpdatedStats(id, reqData) {

}
