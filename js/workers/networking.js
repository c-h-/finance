import ActionTypes from '../redux/action_types.json';

/**
 * payload looks like:
 * {
 * "api": {
    "quandl": "<REDACTED>"
  },
  "id": 1,
  "reqData": {
    "symbols": [
      "BIT",
      "BTC",
      "AAPL",
      "TSLA"
    ],
    "dates": [
      "2016-02-07T17:00:00.000Z",
      "2016-02-17T17:00:00.000Z"
    ],
    "mode": 0
  }
}
 */

/**
 * Build query string
 */
function encodeQueryData(data) {
  const ret = [];
  for (const d in data) {
    ret.push(`${encodeURIComponent(d)}=${encodeURIComponent(data[d])}`);
  }
  return ret.join('&');
}

/**
 * ensure string is two-digits long
 */
function pad(str) {
  return String(`00${str}`).slice(-2);
}

/**
 * format date yyyy-mm-dd
 */
function formatDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth())}-${pad(date.getDate())}`;
}

/**
 * Builds a time-series request to Quandl for financial data
 */
function buildQuandlDatasetRequest(dates, symbol, quandl) {
  const start = 'https://www.quandl.com/api/v3/datasets/BAVERAGE/USD.json';
  if (!dates[0]) {
    dates[0] = dates[1]; // eslint-disable-line no-param-reassign
  }
  if (!dates[1]) {
    return false;
  }
  const firstDate = new Date(dates[0]);
  const secondDate = new Date(dates[1]);
  const reqParams = {
    api_key: quandl,
    start_date: formatDate(firstDate),
    end_date: formatDate(secondDate),
    collapse: 'daily',
  };
  return `${start}?${encodeQueryData(reqParams)}`;
}

// run networking
self.onmessage = ({ data: action }) => { // `data` should be a FSA compliant action object.
  const toPost = action;
  delete toPost.meta; // get rid of meta so it doesn't infinite loop calling worker
  switch (action.type) {
    case ActionTypes.FETCH_STATS: {
      const {
        dates,
        symbols,
      } = action.payload.reqData;
      console.log('Request:', buildQuandlDatasetRequest(dates, symbols[0], action.payload.api.quandl));
      break;
    }
    default:
      break;
  }
  self.postMessage(toPost);
};
