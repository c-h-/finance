import getQuandlUrlsFromMixed from '../../utils/getQuandlUrlsFromMixed';
import checkCacheKeys from '../../utils/checkCacheKeys';
import hash from '../../utils/fastHash';

import ActionTypes from '../action_types.json';

const interceptedTypes = [
  ActionTypes.START_CHART_UPDATE_FLOW,
];

/**
 * Prepares data for the shaping worker
 */
export default function (store) {
  return next => (act) => {
    const action = act;

    if (interceptedTypes.includes(action.type)) {
      const {
        cache,
        portfolios,
        perfReducer,
        settings,
      } = store.getState();
      const currentCacheKeys = Object.keys(cache);

      switch (action.type) {
        case ActionTypes.START_CHART_UPDATE_FLOW: {
          // need to kick off chart update flow
          // 1. get the cached data for the symbols we need
          // 2. send that data to worker for shaping
          // 3. store the shaped data AND ITS REQUEST HASH with the tab config
          // hash lets us only request new shape if the config's changed

          // get the selected tab, then its selected symbols, then quandl urls,
          // then finally generate the hashes we need to check cache against
          const selectedTab = perfReducer.tabs[perfReducer.selectedTabIndex];
          const symbols = selectedTab.data.selectedSymbols.split(',');
          const keys = (getQuandlUrlsFromMixed(
            symbols,
            portfolios.transactions,
            selectedTab.data.dates,
            settings.quandl
          ) || []);
          const misses = checkCacheKeys(keys, currentCacheKeys);
          if (!misses.length) {
            const cacheEntriesToShape = keys.map(key => cache[hash(key)]);
            console.log('entries', cacheEntriesToShape);
            // make sure cache is full for our needed symbols
            return next({
              type: ActionTypes.SHAPE_CHART_DATA,
              payload: {
                data: cacheEntriesToShape,
                mode: selectedTab.data.mode,
                id: selectedTab.id,
              },
              meta: {
                WebWorker: true,
              },
            });
          }
          else {
            console.warn('Not shaping chart data because we are missing hash keys');
            return null;
          }
        }
        default:
          return null;
      }
    }
    return next(action);
  };
}