import ActionTypes from '../redux/action_types.json';

const dispatch = self.postMessage;

/**
 * Perform expensive data shaping here in reducer to save the main thread's framerate
 */
function shapeData(data) {
  return data;
}

// process data
self.onmessage = ({ data: action }) => { // `data` should be a FSA compliant action object.
  const toPost = action;
  delete toPost.meta; // get rid of meta so it doesn't infinite loop calling worker
  switch (action.type) {
    case ActionTypes.SHAPE_RESPONSE: {
      // by the time we get here we're sure we need to fetch the URLs
      // if not, it would have been cancelled by cache
      dispatch({
        type: ActionTypes.SET_CACHE,
        payload: {
          key: action.payload.url,
          value: shapeData(action.payload.body),
        },
      });
      break;
    }
    default:
      dispatch(toPost);
      break;
  }
};
