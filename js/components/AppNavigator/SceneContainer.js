import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  connect,
} from 'react-redux';
import {
  Spinner,
} from '@blueprintjs/core';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  loadingContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#5C7080',
    marginBottom: 20,
  },
});

const SceneContainer = (props) => {
  const {
    appReady,
    children,
  } = props;
  return appReady ? (
    <View style={styles.container}>
      {children}
    </View>
  ) : (
    <View style={styles.loadingContainer}>
      <Text className="pt-ui-text-large" style={styles.text}>Hello</Text>
      <Spinner />
    </View>
  );
};

SceneContainer.propTypes = {
  appReady: PropTypes.bool,
  children: PropTypes.any,
};

function mapStateToProps(state) {
  return {
    appReady: state.transient.appReady,
  };
}

export default connect(mapStateToProps)(SceneContainer);
