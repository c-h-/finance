import ActionTypes from '../../redux/action_types.json';

/**
 * Adds a new portfolio
 */
export function addPortfolio(portfolioName) {
  return {
    type: ActionTypes.ADD_PORTFOLIO,
    payload: {
      name: portfolioName,
    },
  };
}

/**
 * Adds a transaction to a portfolio
 */
export function addTransaction(data) {
  return {
    type: ActionTypes.ADD_TRANSACTION,
    payload: {
      data,
    },
  };
}

/**
 * Takes the row and column index of the edit and parses the edit to
 * the right datatype before storing
 */
export function editTransaction(rowId, col, edit) {
  return {
    type: ActionTypes.EDIT_TRANSACTION,
    payload: {
      rowId,
      col,
      edit,
    },
  };
}
