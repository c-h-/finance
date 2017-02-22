import {
  REHYDRATE,
} from 'redux-persist/constants';

import ActionTypes from '../../redux/action_types.json';

const initState = {
};

export default function home(state = initState, action) {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...state,
        ...action.payload.home,
      };
    }
    default:
      return state;
  }
}
