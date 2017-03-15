import React, {
  Component,
  PropTypes,
} from 'react';
import {
  connect,
} from 'react-redux';
import {
  Text,
  View,
} from 'react-native';
import StatBlock from './StatBlock';

import styles from '../../styles';

class StatBlocks extends Component {
  static propTypes = {
    perfReducer: PropTypes.object,
  }
  static defaultProps = {
    width: 0,
  }
  render() {
    const {
      chartData,
      selectedTabID,
      tabs,
    } = this.props.perfReducer;
    const selectedData = tabs.find(tab => tab.id === selectedTabID);
    let dates = null;
    if (selectedData && selectedData.data) {
      dates = selectedData.data.dates;
    }
    let selectedChartData;
    let seriesCols;
    if (chartData && chartData[selectedData.id] && chartData[selectedData.id].shapedData) {
      selectedChartData = chartData[selectedData.id].shapedData;
      seriesCols = chartData[selectedData.id].columns.filter(col => col !== 'date').sort();
    }
    if (!dates || !selectedChartData || selectedChartData.length === 0) {
      return null;
    }
    const selectedBlockData = [
      selectedChartData[0],
      selectedChartData[selectedChartData.length - 1],
    ];
    return (
      <View style={styles.StatBlocks}>
        {
          seriesCols.length
          && seriesCols.map((col) => {
            return (
              <StatBlock
                key={col}
                col={col}
                cols={seriesCols}
                data={selectedBlockData}
              />
            );
          })
        }
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    perfReducer: state.perfReducer,
  };
}

export default connect(mapStateToProps)(StatBlocks);
