import ActionTypes from '../action_types.json';

const interceptedTypes = [
];

/**
 * Caches API requests based on serialization of request attributes
 */
export default function () {
  return next => (action) => {
    if (!interceptedTypes.includes(action.type)) {
      return next(action);
    }
    return next(action);
  };
}
