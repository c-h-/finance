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
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import { scaleTime } from 'd3-scale';
import {
  ChartCanvas,
  Chart,
  series,
  // scale,
  coordinates,
  // tooltip,
  axes,
} from 'react-stockcharts';

// import ActionTypes from '../../../redux/action_types.json';

const {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} = coordinates;
const {
  LineSeries,
  ScatterSeries,

  CircleMarker,
  SquareMarker,
  TriangleMarker,
} = series;
const {
  XAxis,
  YAxis,
} = axes;

const markers = [
  [
    CircleMarker,
    {
      r: 3,
    },
  ],
  [
    SquareMarker,
    {
      width: 6,
    },
  ],
  [
    TriangleMarker,
    {
      width: 8,
    },
  ],
];

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
    'date': new Date('2017-02-20').getTime(),
    'value_1': +119.11,
    // 'value-2': 230,
  },
  {
    'date': new Date('2017-02-21').getTime(),
    'value_1': +118.895,
    // 'value-2': 229.06,
  },
  {
    'date': new Date('2017-02-22').getTime(),
    'value_1': +118.74,
    // 'value-2': 229.07,
  },
  {
    'date': new Date('2017-02-23').getTime(),
    'value_1': +118.77,
    // 'value-2': 232,
  },
  {
    'date': new Date('2017-02-24').getTime(),
    'value_1': +117.95,
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

class ChartData extends Component {
  static propTypes = {
    perfReducer: PropTypes.object,
    width: PropTypes.number,
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
    const {
      width,
    } = this.props;
    const selectedData = tabs.find(tab => tab.id === selectedTabID);
    let dates = null;
    if (selectedData && selectedData.data) {
      dates = selectedData.data.dates;
    }
    let selectedChartData;
    let seriesCols;
    if (chartData && chartData[selectedData.id] && chartData[selectedData.id].shapedData) {
      selectedChartData = chartData[selectedData.id].shapedData;
      seriesCols = chartData[selectedData.id].columns.filter(col => col !== 'date');
    }
    if (!dates || !selectedChartData) {
      return <Text>Fill out the toolbar and click Compute</Text>;
    }
    console.info('rendering', selectedChartData, test2Data);
    return (
      <View>
        <ChartCanvas
          width={width}
          height={400}
          margin={{
            left: 50,
            right: 50,
            top: 10,
            bottom: 30,
          }}
          seriesName="MSFT"
          data={selectedChartData}
          type="svg"
          xAccessor={d => (d ? d.date : null)}
          xScale={scaleTime()}
          xExtents={dates.map(date => new Date(date))}
        >
          <Chart
            id={0}
            yExtents={(d) => {
              const figs = [];
              for (const key in d) {
                if (key !== 'date') {
                  figs.push(d[key]);
                }
              }
              return figs;
            }}
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
            <MouseCoordinateX
              at="bottom"
              orient="bottom"
              displayFormat={timeFormat('%Y-%m-%d')}
            />
            <MouseCoordinateY
              at="right"
              orient="right"
              displayFormat={format('.2f')}
            />
            {
              seriesCols.map((col) => {
                return (
                  <LineSeries
                    yAccessor={d => d[col]}
                  />
                );
              })
            }
            {
              seriesCols.map((col, i) => {
                console.log('marker', markers, i % markers.length, markers[i % markers.length]);
                return (
                  <ScatterSeries
                    yAccessor={d => d[col]}
                    marker={markers[i % markers.length][0]}
                    markerProps={markers[i % markers.length][1]}
                  />
                );
              })
            }
          </Chart>
          <CrossHairCursor />
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
