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
import {
  AreaChart,
} from 'react-d3-components';

import ActionTypes from '../../../redux/action_types.json';

const testdata = [
    {
    label: 'somethingA',
    values: [{x: 0, y: 2}, {x: 1.3, y: 5}, {x: 3, y: 6}, {x: 3.5, y: 6.5}, {x: 4, y: 6}, {x: 4.5, y: 6}, {x: 5, y: 7}, {x: 5.5, y: 8}]
    },
    {
    label: 'somethingB',
    values: [{x: 0, y: 3}, {x: 1.3, y: 4}, {x: 3, y: 7}, {x: 3.5, y: 8}, {x: 4, y: 7}, {x: 4.5, y: 7}, {x: 5, y: 7.8}, {x: 5.5, y: 9}]
    }
];

class ChartData extends Component {
  static propTypes = {
    selectedTab: PropTypes.number,
    chartData: PropTypes.object,
  }
  render() {
    const {
      chartData,
      selectedTab,
    } = this.props;
    // const selectedData = chartData[selectedTab.toString()];
    console.log('data', selectedTab, chartData);
    // if (!selectedData || !selectedData.columns || !selectedData.columns.length) {
    //   return <Text>Nothing to show</Text>;
    // }
    // const {
    //   columns,
    //   shapedData,
    // } = selectedData;
    // const data = [...shapedData].map((point) => {
    //   return {
    //     ...point,
    //   };
    // });
    // data.forEach((point, i) => {
    //   for (const key in point) {
    //     console.log('point', point, key, data[i][key]);
    //     if (key === 'date') {
    //       data[i][key] = new Date(data[i][key]).getTime();
    //     }
    //     else {
    //       data[i][key] = +data[i][key];
    //     }
    //   }
    // });
    // console.log('ChartData', data);
    return (
      <View>
        <AreaChart
          data={testdata}
          width={400}
          height={400}
          margin={{
            top: 10,
            bottom: 50,
            left: 50,
            right: 10,
          }}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    chartData: state.perfReducer.chartData,
  };
}

export default connect(mapStateToProps)(ChartData);
