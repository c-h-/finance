import getQuandlUrlsFromMixed from '../../utils/getQuandlUrlsFromMixed';

import ActionTypes from '../../redux/action_types.json';
import misc from '../../constants/misc.json';


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
 * Set fetching
 */
export function setFetching(modifier = 0, totalFetching) {
  return {
    type: ActionTypes.SET_FETCHING,
    payload: {
      reducer: 'perfReducer',
      modifier,
      totalFetching,
    },
  };
}

/**
 * Switch between perf tabs
 */
export function switchTabs(selectedTabID) {
  return {
    type: ActionTypes.SWITCH_TABS,
    payload: {
      selectedTabID,
    },
  };
}

/**
 * Kicks off request process to get data from API
 */
export function fetchUpdatedStats(id, reqData) {
  return (dispatch, getState) => {
    const state = getState();
    const {
      transactions,
    } = state.portfolios;
    const {
      quandl,
    } = state.settings;

    const symbols = reqData.selectedSymbols.split(',');
    const urls = getQuandlUrlsFromMixed(symbols, transactions, reqData.dates, quandl);

    return dispatch({
      type: ActionTypes.FETCH_STATS,
      payload: {
        apiType: misc.apiTypes.QUANDL,
        urls,
      },
      meta: {
        WebWorker: true,
      },
    });
  };
}
