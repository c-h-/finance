import React, {
  PropTypes,
} from 'react';
import {
  View,
} from 'react-native';

import styles from './styles';

import ChartManager from './components/ChartManager';

const Performance = () => {
  return (
    <View style={styles.container}>
      <h2>
        Performance
      </h2>
      <ChartManager />
    </View>
  );
};

Performance.contextTypes = {
  store: PropTypes.object,
};

export default Performance;
