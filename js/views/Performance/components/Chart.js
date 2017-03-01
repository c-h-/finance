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

import Tooltip from './Tooltip';

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

const colors = [
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#34495e',
  '#f1c40f',
  '#e67e22',
  '#e74c3c',
  '#95a5a6',
  '#1abc9c',
  '#27ae60',
  '#2980b9',
  '#8e44ad',
  '#2c3e50',
  '#f39c12',
  '#d35400',
  '#c0392b',
  '#7f8c8d',
  '#16a085',
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
    // console.info('rendering', selectedChartData, test2Data);
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
          seriesName="Data"
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
              seriesCols.map((col, i) => {
                const color = colors[i % colors.length];
                return (
                  <LineSeries
                    yAccessor={d => d[col]}
                    stroke={color}
                  />
                );
              })
            }
            {
              seriesCols.map((col, i) => {
                const color = colors[i % colors.length];
                return (
                  <ScatterSeries
                    yAccessor={d => d[col]}
                    marker={markers[i % markers.length][0]}
                    markerProps={{
                      ...markers[i % markers.length][1],
                      stroke: color,
                      fill: color,
                    }}
                  />
                );
              })
            }
            <Tooltip forChart={1} origin={[40, 0]} />
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
