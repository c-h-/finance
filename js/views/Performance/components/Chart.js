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
import { timeParse } from 'd3-time-format';
import { scaleTime } from 'd3-scale';
import {
  ChartCanvas,
  Chart,
  series,
  scale,
  coordinates,
  tooltip,
  axes,
} from 'react-stockcharts';

import ActionTypes from '../../../redux/action_types.json';

const testData = [
  {
    date: new Date('2017-01-8').getTime(),
    'value-1': +5743.25,
  },
  {
    date: new Date('2017-01-10').getTime(),
    'value-1': +5687.4,
  },
  {
    date: new Date('2017-01-12').getTime(),
    'value-1': +5604.3,
  },
  {
    date: new Date('2017-01-14').getTime(),
    'value-1': +5512.15,
  },
];

const test2Data = [
  {
    'date': new Date('2017-01-8').getTime(),
    'value-1': +119.11,
    // 'value-2': 230,
  },
  {
    'date': new Date('2017-01-9').getTime(),
    'value-1': +118.895,
    // 'value-2': 229.06,
  },
  {
    'date': new Date('2017-01-10').getTime(),
    'value-1': +118.74,
    // 'value-2': 229.07,
  },
  {
    'date': new Date('2017-01-11').getTime(),
    'value-1': +118.77,
    // 'value-2': 232,
  },
  {
    'date': new Date('2017-01-12').getTime(),
    'value-1': +117.95,
    // 'value-2': 228.97,
  },
];

const test3 = [
  {
    "date": 1484265600000,
    "value-1": +119.11,
    // "value-2": 230
  },
  {
    "date": 1484179200000,
    "value-1": +118.895,
    // "value-2": 229.06
  },
  {
    "date": 1484092800000,
    "value-1": +118.74,
    // "value-2": 229.07
  },
  {
    "date": 1484006400000,
    "value-1": +118.77,
    // "value-2": 232
  },
  {
    "date": 1483920000000,
    "value-1": +117.95,
    // "value-2": 228.97
  }
];

const { AreaSeries } = series;
const { XAxis, YAxis } = axes;

const parseDate = timeParse('%Y-%m-%d');

class ChartData extends Component {
  static propTypes = {
    perfReducer: PropTypes.object,
  }
  render() {
    const {
      chartData,
      selectedTabIndex,
      tabs,
    } = this.props.perfReducer;
    const selectedData = chartData[selectedTabIndex.toString()];
    console.log('data', selectedTabIndex, chartData, tabs);
    if (!selectedData || !selectedData.columns || !selectedData.columns.length) {
      return <Text>Nothing to show</Text>;
    }
    const {
      columns,
      shapedData,
    } = selectedData;
    const data = [...shapedData].map((point) => {
      return {
        ...point,
      };
    });
    data.forEach((point, i) => {
      for (const key in point) {
        console.log('point', point, key, data[i][key]);
        if (key === 'date') {
          data[i][key] = new Date(parseDate(data[i][key])).getTime();
        }
        else {
          data[i][key] = +data[i][key];
        }
      }
    });
    console.log('ChartData', data);
    return <Text>Nothing to show</Text>;
    return (
      <View>
        <ChartCanvas
          width={400}
          height={400}
          margin={{
            left: 50,
            right: 50,
            top: 10,
            bottom: 30,
          }}
          seriesName="MSFT"
          data={data}
          type="svg"
          xAccessor={d => {
            console.log('d', d, d ? new Date(d.date) : null);
            return d ? d.date : null;
          }}
          xScale={scaleTime()}
          xExtents={[new Date(2017, 1, 19), new Date(2017, 2, 10)]}
        >
          <Chart
            id={0}
            yExtents={d => d['value-1']}
          >
            <XAxis
              axisAt="bottom"
              orient="bottom"
              ticks={6}
            />
            <YAxis
              axisAt="left"
              orient="left"
            />
            <AreaSeries
              yAccessor={d => d['value-1']}
            />
          </Chart>
        </ChartCanvas>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    perfReducer: state.perfReducer,
  };
}

export default connect(mapStateToProps)(ChartData);
