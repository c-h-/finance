
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
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/**
 * Get Quandl database code of a symbol
 */
function getDatabaseCode(symbol) {
  switch (symbol) {
    case 'BTC':
      return 'BAVERAGE';
    default:
      return 'WIKI';
  }
}

/**
 * Get Quandl Dataset code of a symbol
 */
function getDatasetCode(symbol) {
  switch (symbol) {
    case 'BTC':
      return 'USD';
    default:
      return symbol.toUpperCase();
  }
}

/**
 * Builds a time-series request to Quandl for financial data
 */
export default function buildQuandlDatasetRequest(dates, symbol, quandl) {
  const start = 'https://www.quandl.com/api/v3/datasets/'
    + `${getDatabaseCode(symbol)}/${getDatasetCode(symbol)}.json`;
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
