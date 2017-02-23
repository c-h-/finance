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

export function switchTabs(selectedTabIndex) {
  return {
    type: ActionTypes.SWITCH_TABS,
    payload: {
      selectedTabIndex,
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
    const quandlURLs = getQuandlUrlsFromMixed(symbols, transactions, reqData.dates, quandl);

    return dispatch({
      type: ActionTypes.FETCH_STATS,
      payload: {
        urls: quandlURLs,
        apiType: misc.apiTypes.QUANDL,
      },
      meta: {
        WebWorker: true,
      },
    });
  };
}
