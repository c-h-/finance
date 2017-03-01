import checkCacheKeys from '../../utils/checkCacheKeys';

import ActionTypes from '../action_types.json';

const interceptedTypes = [
  ActionTypes.FETCH_STATS,
];

/**
 * Caches API requests based on serialization of request attributes
 */
export default function (store) {
  return next => (act) => {
    const action = act;

    if (interceptedTypes.includes(action.type)) {
      const {
        cache,
      } = store.getState();
      const currentCacheKeys = Object.keys(cache);

      switch (action.type) {
        case ActionTypes.FETCH_STATS: {
          const keys = action.payload.urls;
          // check if our cache has hits for request being made
          const misses = checkCacheKeys(keys, currentCacheKeys);

          if (misses.length) {
            action.payload.urls = misses;
            return next(action);
          }
          console.warn('All requests were cached so shaping started right away');
          return next({
            type: ActionTypes.START_CHART_UPDATE_FLOW,
          }); // everything was cached, don't grab anything
        }
        default:
          return null;
      }
    }
    return next(action);
  };
}
