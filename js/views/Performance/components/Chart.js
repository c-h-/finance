import React, {
  Component,
  PropTypes,
} from 'react';
import {
  connect,
} from 'react-redux';


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
  ScatterSeries,
  CircleMarker,
  SquareMarker,
  TriangleMarker,
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

class Random extends Component {
  render() {
    return (
      <ChartCanvas width={500} height={400}
          margin={{ left: 70, right: 70, top: 20, bottom: 30 }}
          pointsPerPxThreshold={1}
          seriesName="MSFT"
          data={data}
          xAccessor={d => d.date} xScaleProvider={discontinuousTimeScaleProvider}
          xExtents={[new Date(2012, 0, 1), new Date(2012, 2, 2)]}>
        <Chart id={1}
            yExtents={d => [d.high, d.low, d.AAPLClose, d.GEClose]}>
          <XAxis axisAt="bottom" orient="bottom"/>
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
            displayFormat={timeFormat("%Y-%m-%d")} />
          <MouseCoordinateY
            at="right"
            orient="right"
            displayFormat={format(".2f")} />

          <LineSeries
            yAccessor={d => d.AAPLClose}
            stroke="#ff7f0e"
            strokeDasharray="Dot" />
          <ScatterSeries
            yAccessor={d => d.AAPLClose}
            marker={SquareMarker}
            markerProps={{ width: 6, stroke: "#ff7f0e", fill: "#ff7f0e" }} />
          <LineSeries
            yAccessor={d => d.GEClose}
            stroke="#2ca02c" />
          <ScatterSeries
            yAccessor={d => d.GEClose}
            marker={TriangleMarker}
            markerProps={{ width: 8, stroke: "#2ca02c", fill: "#2ca02c" }} />
          <LineSeries
            yAccessor={d => d.close}
            strokeDasharray="LongDash" />
          <ScatterSeries
            yAccessor={d => d.close}
            marker={CircleMarker}
            markerProps={{ r: 3 }} />
          <OHLCTooltip forChart={1} origin={[-40, 0]}/>
        </Chart>

        <CrossHairCursor />
      </ChartCanvas>
    );
  }
}

Random.propTypes = {
  dispatch: PropTypes.func,
};

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Random);
