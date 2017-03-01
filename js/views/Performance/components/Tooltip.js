import React, { PropTypes, Component } from 'react';
import { format } from 'd3-format';
import { timeFormat } from 'd3-time-format';
import {
  GenericChartComponent,
  tooltip,
} from 'react-stockcharts';

const {
  ToolTipText,
  ToolTipTSpanLabel,
} = tooltip;

/**
 * returns input or input wrapped in arrow
 */
function functor(v) {
  return typeof v === 'function' ? v : () => v;
}

class Tooltip extends Component {
  constructor(props) {
    super(props);
    this.renderSVG = this.renderSVG.bind(this);
  }
  renderSVG(moreProps) {
    const {
      className,
      onClick,
      xDisplayFormat,
      fontFamily,
      fontSize,
      accessor,
      numericFormat,
    } = this.props;
    const {
      chartConfig: {
        width,
        height,
      },
      currentItem,
    } = moreProps;

    const formatted = {};

    if (
      currentItem
      && accessor(currentItem)
    ) {
      const item = accessor(currentItem);
      for (const key in item) {
        switch (key) {
          case 'date':
            formatted[key] = xDisplayFormat(item[key]);
            break;
          default:
            formatted[key] = numericFormat(item[key]);
            break;
        }
      }
    }

    const rendered = [];
    for (const key in formatted) {
      if (key !== 'date') {
        rendered.push(
          <ToolTipTSpanLabel key={`label_${key}`}>{` ${key.toUpperCase()}: `}</ToolTipTSpanLabel>
        );
        rendered.push(
          <tspan key={`value_${key}`}>{formatted[key]}</tspan>
        );
      }
    }

    const {
      origin: originProp,
    } = this.props;
    const origin = functor(originProp);
    const [x, y] = origin(width, height);

    return (
      <g
        className={`react-stockcharts-toottip-hover ${className}`}
        transform={`translate(${x}, ${y})`}
        onClick={onClick}
      >
        <ToolTipText
          x={0}
          y={0}
          fontFamily={fontFamily}
          fontSize={fontSize}
        >
          <ToolTipTSpanLabel key="label" x={0} dy="5">Date: </ToolTipTSpanLabel>
          <tspan key="value">{formatted.date}</tspan>
          {
            rendered
          }
        </ToolTipText>
      </g>
    );
  }
  render() {
    return (
      <GenericChartComponent
        clip={false}
        svgDraw={this.renderSVG}
        drawOnMouseMove
      />
    );
  }
}

Tooltip.propTypes = {
  className: PropTypes.string,
  accessor: PropTypes.func.isRequired,
  xDisplayFormat: PropTypes.func.isRequired,
  numericFormat: PropTypes.func.isRequired,
  origin: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.func,
  ]).isRequired,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.number,
  onClick: PropTypes.func,
  // volumeFormat: PropTypes.func,
};

Tooltip.defaultProps = {
  accessor: (d) => {
    return {
      ...d,
    };
  },
  xDisplayFormat: timeFormat('%Y-%m-%d'),
  // volumeFormat: format('.4s'),
  numericFormat: format('.2f'),
  origin: [0, 0],
};

export default Tooltip;
