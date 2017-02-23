import {
  REHYDRATE,
} from 'redux-persist/constants';

import ActionTypes from '../../redux/action_types.json';

function getNewTab(id = 1) {
  return {
    id,
    data: {},
  };
}

const initState = {
  tabs: [
    getNewTab(),
  ],
};

export default function perfReducer(state = initState, action) {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload.perfReducer,
      };
    }
    case ActionTypes.ADD_PERF_TAB: {
      const {
        tabs,
      } = state;
      const newID = tabs.length ? Math.max(...tabs.map(row => row.id)) + 1 : 1;
      return {
        ...state,
        tabs: [
          ...tabs,
          getNewTab(newID),
        ],
      };
    }
    case ActionTypes.SAVE_PERF_TAB: {
      const {
        tabs,
      } = state;
      const newID = tabs.length ? Math.max(...tabs.map(row => row.id)) + 1 : 1;
      return {
        ...state,
        tabs: [
          ...tabs,
          getNewTab(newID),
        ],
      };
    }
    default:
      return state;
  }
}
