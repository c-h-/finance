import getSymbols from './getSymbols';
import buildQuandlRequest from './buildQuandlRequest';

/**
 * Gets all unique Quandl URLs from mixed type inputs
 */
export default function getQuandlUrlsFromMixed(symbols, transactions, dates, apiKey) {
  const newSymbols = getSymbols(symbols, transactions);
  return newSymbols.map(symbol => ([buildQuandlRequest(dates, symbol, apiKey), symbol]))
    .filter(req => req[0]); // get rid of erroring requests
}
