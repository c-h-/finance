import ActionTypes from '../redux/action_types.json';

const dispatch = self.postMessage;

/**
 * Gets a URLs contents
 */
function getURLContents(url, options) {
  return new Promise((resolve, reject) => {
    const opts = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
      },
      ...options,
    };
    fetch(url, opts)
      .then(response => response.json(), reject)
      .then(resolve, reject)
      .catch(reject);
  });
}

// run networking
self.onmessage = ({ data: action }) => { // `data` should be a FSA compliant action object.
  const toPost = action;
  delete toPost.meta; // get rid of meta so it doesn't infinite loop calling worker
  switch (action.type) {
    case ActionTypes.FETCH_STATS: {
      // by the time we get here we're sure we need to fetch the URLs
      // if not, it would have been cancelled by cache
      action.payload.urls.forEach((url) => {
        getURLContents(url).then((body) => {
          if (body) {
            dispatch({
              // pass response to next worker for shaping
              type: ActionTypes.SHAPE_RESPONSE,
              payload: {
                apiType: action.payload.apiType,
                url,
                body,
              },
              meta: {
                WebWorker: true,
              },
            });
          }
        })
        .catch((e) => {
          dispatch({
            type: ActionTypes.ERROR,
            payload: e,
          });
        });
      });
      break;
    }
    default:
      dispatch(toPost);
      break;
  }
};
