import ActionTypes from '../../redux/action_types.json';
import misc from '../../constants/misc.json';
import symbolTypes from '../../constants/symbolTypes.json';
import transStructure from '../../constants/transactionStructure.json';

/**
 * Adds a new comparison tab
 */
export function addNewComparison() {
  return {
    type: ActionTypes.ADD_PERF_TAB,
  };
}

/**
 * Saves comparison tab configuration
 */
export function saveComparison(id, newState) {
  return {
    type: ActionTypes.SAVE_PERF_TAB,
    payload: {
      id,
      newState,
    },
  };
}

/**
 * Kicks off request process to get data from API
 */
export function fetchUpdatedStats(id, reqData) {
  return (dispatch, getState) => {
    const state = getState();
    const {
      transactions,
    } = state.portfolios;
    const {
      quandl,
    } = state.settings;
    const toSend = {
      ...reqData,
    };
    const symbols = toSend.selectedSymbols.split(',');
    delete toSend.data;
    delete toSend.isOpen;
    delete toSend.id;
    delete toSend.selectedSymbols;
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
    toSend.symbols = newSymbols;

    return dispatch({
      type: ActionTypes.FETCH_STATS,
      payload: {
        id,
        reqData: toSend,
        api: {
          quandl,
        },
      },
      meta: {
        WebWorker: true,
      },
    });
  };
}
