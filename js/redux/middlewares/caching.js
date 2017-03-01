import checkCacheKeys from '../../utils/checkCacheKeys';
import {
  setFetching,
} from '../../views/Performance/actions';

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
            next(setFetching(misses.length, misses.length));
            return next({
              ...action,
              type: ActionTypes.FETCH_REMOTE,
            });
          }
          else {
            // everything was cached, don't grab anything
            next(setFetching(1, 1));
            return next({
              type: ActionTypes.START_CHART_UPDATE_FLOW,
            });
          }
        }
        default:
          return null;
      }
    }
    return next(action);
  };
}
