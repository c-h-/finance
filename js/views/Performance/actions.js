import ActionTypes from '../../redux/action_types.json';

export function addNewComparison() {
  return {
    type: ActionTypes.ADD_PERF_TAB,
  };
}

export function saveComparison(id, newState) {
  return {
    type: ActionTypes.SAVE_PERF_TAB,
    payload: {
      id,
      newState,
    },
  };
}
