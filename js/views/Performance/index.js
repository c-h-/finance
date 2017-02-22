import React, {
  PropTypes,
} from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './styles';

const Performance = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        Welcome to React Native
      </Text>
      <Text style={styles.instructions}>
        To get started, edit index.*.js
      </Text>
    </View>
  );
};

Performance.contextTypes = {
  store: PropTypes.object,
};

export default Performance;
