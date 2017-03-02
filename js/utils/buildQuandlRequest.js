import formatDate from './formatDate';

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
 * Get Quandl database code of a symbol
 */
function getDatabaseCode(symbol) {
  switch (symbol) {
    case 'BTC':
    case 'ETH':
      return 'BITFINEX';
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
    case 'ETH':
      return `${symbol}USD`;
    default:
      return symbol.toUpperCase();
  }
}

/**
 * Builds a time-series request to Quandl for financial data
 */
export default function buildQuandlDatasetRequest(dates, symbol, quandl) {
  if (symbol === 'USD') {
    return false;
  }
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
