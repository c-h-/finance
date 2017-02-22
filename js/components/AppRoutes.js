import React, {
  PropTypes,
} from 'react';

import Icon from './Icon';
import Performance from '../views/Performance';
import Portfolios from '../views/Portfolios';
import NotFound from '../views/NotFound';
import Settings from '../views/Settings';

export const notFoundKey = 'NotFound';

/**
 * Gets an Icon component.
 */
const getIcon = (name) => {
  const comp = ({ tintColor }) => (
    <Icon
      name={name}
      style={{
        color: tintColor,
      }}
    />
  );
  comp.propTypes = {
    tintColor: PropTypes.string,
  };
  return comp;
};

/**
 * The routes for the App
 */
export const AppRoutes = {
  Performance: {
    screen: Performance,
    path: 'performance',
    navigationOptions: {
      title: 'Performance',
      tabBar: {
        label: 'Performance',
        icon: getIcon('timeline'),
      },
    },
  },
  Portfolios: {
    screen: Portfolios,
    path: 'portfolios',
    navigationOptions: {
      title: 'Portfolios',
      tabBar: {
        label: 'Portfolios',
        icon: getIcon('reorder'),
      },
    },
  },
  Settings: {
    screen: Settings,
    path: 'settings',
    navigationOptions: {
      title: 'Settings',
      tabBar: {
        label: 'Settings',
        icon: getIcon('settings'),
      },
    },
  },
  NotFound: {
    screen: NotFound,
    path: '404',
    navigationOptions: {
      title: 'Nothing Found',
    },
  },
};
