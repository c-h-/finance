import symbolTypes from '../constants/symbolTypes.json';
import transStructure from '../constants/transactionStructure.json';
import misc from '../constants/misc.json';

/**
 * Get symbols from a list
 */
export default function getSymbols(symbols = [], transactions = []) {
  const newSymbols = [];
  for (const i in symbols) {
    if (symbols[i].indexOf(misc.SYM_DELIMETER) > -1) {
      // found a symbol delimeted by a type
      const t = symbols[i].split(misc.SYM_DELIMETER);
      switch (t[0]) {
        case symbolTypes.PORTFOLIO: {
          const selectedTransactions = transactions.filter((trans) => {
            return trans[transStructure.PID] === parseInt(t[1], 10);
          });
          selectedTransactions.forEach((trans) => {
            if (newSymbols.indexOf(trans[transStructure.SYMBOL]) === -1) {
              newSymbols.push(trans[transStructure.SYMBOL].toUpperCase());
            }
          });
          break;
        }
        default:
          newSymbols.push(symbols[i].toUpperCase());
          break;
      }
    }
    else {
      newSymbols.push(symbols[i].toUpperCase());
    }
  }
  return newSymbols;
}
