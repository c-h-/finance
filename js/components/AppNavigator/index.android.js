import {
  TabNavigator,
} from 'react-navigation';

import TabRoutes from './TabRoutes';
import sharedTabBarOptions from './sharedTabBarOptions';

const AppNavigator = TabNavigator(TabRoutes, {
  initialRouteName: 'Performance',
  tabBarPosition: 'top',
  tabBarOptions: sharedTabBarOptions,
});

export default AppNavigator;
