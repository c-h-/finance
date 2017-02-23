import {
  combineReducers,
} from 'redux';

import AppNavigator from '../../components/AppNavigator';

import transient from '../reducers/transient';
import performanceReducer from '../../views/Performance/reducer';
import portfolios from '../../views/Portfolios/reducer';

export default combineReducers({
  transient,
  nav: (state, action) => {
    return AppNavigator.router.getStateForAction(action, state) || state;
  },
  portfolios,
  performanceReducer,
});
