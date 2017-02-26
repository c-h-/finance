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
  state = {
    width: 400,
  }
  handleLayout = (e) => {
    console.info('LAYOUT', e);
    if (
      e
      && e.nativeEvent
      && e.nativeEvent.layout
      && e.nativeEvent.layout.width
    ) {
      this.setState({
        width: e.nativeEvent.layout.width,
      });
    }
  }
  render() {
    return (
      <View
        className="pt-card"
        onLayout={this.handleLayout}
      >
        <Chart width={this.state.width} />
      </View>
    );
  }
}

export default ChartContainer;
