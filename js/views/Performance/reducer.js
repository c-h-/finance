import {
  REHYDRATE,
} from 'redux-persist/constants';
import update from 'immutability-helper';

import buildUpdateObj from '../../utils/buildUpdateObj';

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
  chartData: {},
  selectedTabID: 1,
};

export default function perfReducer(state = initState, action) {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload.perfReducer,
      };
    }
    case ActionTypes.SWITCH_TABS: {
      return {
        ...state,
        selectedTabID: action.payload.selectedTabID,
      };
    }
    case ActionTypes.STORE_CHART_DATA: {
      return {
        ...state,
        chartData: {
          ...state.chartData,
          [action.payload.id]: action.payload.data,
        },
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
      const {
        id,
        newState,
      } = action.payload;

      let selectedTabID;
      for (const i in tabs) {
        if (tabs[i].id === id) {
          selectedTabID = i;
          break;
        }
      }
      console.log('selectedTabID', selectedTabID, id, tabs, action.payload);

      const newTabData = {
        id,
        data: newState,
      };

      const updateObj = buildUpdateObj(selectedTabID.toString(), newTabData);
      const updatedTabs = update(tabs, updateObj);
      return {
        ...state,
        tabs: updatedTabs,
      };
    }
    default:
      return state;
  }
}
