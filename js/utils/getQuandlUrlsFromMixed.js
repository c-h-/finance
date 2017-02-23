import getSymbols from './getSymbols';
import buildQuandl from './buildQuandlRequest';

/**
 * Gets all unique Quandl URLs from mixed type inputs
 */
export default function getQuandlUrlsFromMixed(symbols, transactions, dates, apiKey) {
  const newSymbols = getSymbols(symbols, transactions);
  return newSymbols.map(symbol => buildQuandl(dates, symbol, apiKey))
    .filter(req => req); // get rid of erroring requests
}
