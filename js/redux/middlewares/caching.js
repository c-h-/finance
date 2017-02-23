import hash from '../../utils/fastHash';

import ActionTypes from '../action_types.json';

/**
 * Caches API requests based on serialization of request attributes
 */
export default function (store) {
  return next => (act) => {
    const action = act;
    const {
      cache,
    } = store.getState();

    if (action.type === ActionTypes.FETCH_STATS) {
      const keys = action.payload.urls;
      const currentCacheKeys = Object.keys(cache);

      // check if our cache has hits for request being made
      const misses = keys.filter(key => currentCacheKeys.indexOf(hash(key).toString()) === -1);

      if (misses.length) {
        action.payload.urls = misses;
        return next(action);
      }
      console.warn('All requests were cached so loading was cancelled');
      return null; // everything was cached, don't grab anything
    }
    return next(action);
  };
}
