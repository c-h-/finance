import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
} from 'react-native';
import {
  connect,
} from 'react-redux';

import styles from '../styles';

import Chart from './Chart';

class ChartContainer extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    dispatch: PropTypes.func,
    selectedTab: PropTypes.number,
  }
  render() {
    return (
      <View className="pt-card">
        <Chart selectedTab={this.props.selectedTab} />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    tabs: state.perfReducer.tabs || [],
  };
}

export default connect(mapStateToProps)(ChartContainer);
