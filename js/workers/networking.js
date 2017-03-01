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

/**
 * Recurses through requests making them one at a time to make Quandl happy
 */
function recurseThroughRequests(urls, apiType) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(urls) && urls.length) {
      const url = urls.pop();
      getURLContents(url).then((body) => {
        if (body) {
          dispatch({
            // pass response to next worker for shaping
            type: ActionTypes.SHAPE_RESPONSE,
            payload: {
              apiType,
              url,
              body,
            },
            meta: {
              WebWorker: true,
            },
          });
        }
        // next!
        recurseThroughRequests(urls, apiType)
          .then(resolve, reject);
      })
      .catch((e) => {
        dispatch({
          type: ActionTypes.ERROR,
          payload: e,
        });
      });
    }
    else {
      // nothing to do
      resolve();
    }
  });
}

/**
 * Networking toolchain
 */
self.onmessage = ({ data: action }) => { // `data` should be a FSA compliant action object.
  const toPost = action;
  delete toPost.meta; // get rid of meta so it doesn't infinite loop calling worker
  switch (action.type) {
    case ActionTypes.FETCH_REMOTE: {
      // by the time we get here we're sure we need to fetch the URLs
      // if not, it would have been cancelled by cache
      recurseThroughRequests(action.payload.urls, action.payload.apiType);
      break;
    }
    default:
      dispatch(toPost);
      break;
  }
};
