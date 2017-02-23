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
import ActionTypes from '../../../redux/action_types.json';

import {
  format,
} from 'd3-format';
import {
  timeFormat,
} from 'd3-time-format';

import {
  ChartCanvas,
  Chart,
  series,
  scale,
  coordinates,
  tooltip,
  axes,
} from 'react-stockcharts';

const {
  LineSeries,
} = series;
const {
  discontinuousTimeScaleProvider,
} = scale;

const {
  CrossHairCursor,
  MouseCoordinateX,
  MouseCoordinateY,
} = coordinates;

const {
  OHLCTooltip,
} = tooltip;
const {
  XAxis,
  YAxis,
} = axes;

class ChartData extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    cache: PropTypes.object,
    selectedTab: PropTypes.number,
  }
  render() {
    const {
      chartData,
      selectedTab,
    } = this.props;
    const selectedData = chartData[selectedTab.toString()];
    if (!selectedData || !selectedData.columns || !selectedData.columns.length) {
      return <Text>Nothing to show</Text>;
    }
    console.log('ChartData', this.props.chartData);
    const {
      columns,
      shapedData,
    } = selectedData;
    const data = shapedData;
    data.columns = columns;
    return (
      <View>
      <ChartCanvas
        width={500}
        height={400}
        margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
        pointsPerPxThreshold={1}
        seriesName="DATA"
        data={data}
      >
      {/*
      xAccessor={d => d.date}
      xScaleProvider={discontinuousTimeScaleProvider}
      xExtents={[new Date(2017, 0, 1), new Date(2017, 2, 2)]}
      */}
        <Chart
          id={1}
          yExtents={d => [d.value_1, d.value_2]}
        >
          {/*<XAxis
            axisAt="bottom"
            orient="bottom"
          />
          <YAxis
            axisAt="right"
            orient="right"
            // tickInterval={5}
            // tickValues={[40, 60]}
            ticks={5}
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
          />*/}

          <LineSeries
            yAccessor={d => d.value_1}
            stroke="#ff7f0e"
            strokeDasharray="Dot"
          />
          {/*<OHLCTooltip
            forChart={1}
            origin={[-40, 0]}
          />*/}
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    cache: state.cache,
    chartData: state.perfReducer.chartData,
  };
}

export default connect(mapStateToProps)(ChartData);
