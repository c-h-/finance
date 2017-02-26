import ActionTypes from '../redux/action_types.json';
import formatDate from '../utils/formatDate';

const dispatch = self.postMessage;

const QUANDL_STOCK_COLUMNS = {
  DATE: 0,
  OPEN: 1,
  HIGH: 2,
  LOW: 3,
  CLOSE: 4,
  VOLUME: 5,
  EX_DIVIDEND: 6,
  SPLIT_RATIO: 7,
  ADJ_OPEN: 8,
  ADJ_HIGH: 9,
  ADJ_LOW: 10,
  ADJ_CLOSE: 11,
  ADJ_VOLUME: 12,
};
const QUANDL_CURRENCY_COLUMNS = {
  DATE: 0,
  AVG_24: 1,
  ASK: 2,
  BID: 3,
  LAST: 4,
  VOLUME: 5,
};

/**
 * Perform expensive data shaping here in reducer to save the main thread's framerate
 */
function shapeResponse(data) {
  if (data && data.dataset && data.dataset.data && data.dataset.column_names) {
    let valueColumnToKeep;
    let colsDef;
    switch (data.dataset.database_code) {
      case 'BAVERAGE':
        valueColumnToKeep = QUANDL_CURRENCY_COLUMNS.AVG_24;
        colsDef = QUANDL_CURRENCY_COLUMNS;
        break;
      case 'WIKI':
      default:
        valueColumnToKeep = QUANDL_STOCK_COLUMNS.OPEN;
        colsDef = QUANDL_STOCK_COLUMNS;
        break;
    }
    const shaped = data.dataset.data.map((row) => {
      return {
        date: formatDate(row[colsDef.DATE]),
        value: row[valueColumnToKeep],
      };
    });
    shaped.columns = ['date', 'value'];
    return shaped;
  }
  else {
    return false;
  }
}


/**
 *[ {
  "date": "2007-01-03T05:00:00.000Z",
  "open": 29.91,
  "high": 30.25,
  "low": 29.4,
  "close": 29.86,
  "volume": 76935100,
  "SP500Close": 1416.6,
  "AAPLClose": 11.97,
  "GEClose": 37.97
} ]
columns: [
  "date",
  "open",
  "high",
  "low",
  "close",
  "volume",
  "SP500Close",
  "AAPLClose",
  "GEClose"
] */
/**
 * Shapes data for a chart to display
 */
function shapeDataForChart(data, mode) {
  const shapedData = [];
  data.forEach((dataset, i) => {
    // console.log('dataset', dataset);
    dataset.forEach((point) => {
      const shapedPoint = shapedData.find(x => x.date === point.date);
      if (shapedPoint) {
        shapedPoint[`value_${i}`] = point.value;
      }
      else {
        shapedData.push({
          date: point.date,
          [`value_${i}`]: point.value,
        });
      }
    });
  });
  const columns = ['date', ...data.map((set, i) => `value_${i}`)];
  return {
    shapedData,
    columns,
  };
}

// process data
self.onmessage = ({ data: action }) => { // `data` should be a FSA compliant action object.
  const toPost = action;
  delete toPost.meta; // get rid of meta so it doesn't infinite loop calling worker
  switch (action.type) {
    case ActionTypes.SHAPE_RESPONSE: {
      // by the time we get here we're sure we need to fetch the URLs
      // if not, it would have been cancelled by cache
      dispatch({
        type: ActionTypes.SET_CACHE,
        payload: {
          key: action.payload.url,
          value: shapeResponse(action.payload.body),
        },
      });
      dispatch({
        type: ActionTypes.START_CHART_UPDATE_FLOW,
      });
      break;
    }
    case ActionTypes.SHAPE_CHART_DATA: {
      // payload: {
      //           data,
      //           mode: selectedTab.mode,
      //            id
      //         },
      dispatch({
        type: ActionTypes.STORE_CHART_DATA,
        payload: {
          id: action.payload.id,
          data: shapeDataForChart(action.payload.data, action.payload.mode),
        },
      });
      break;
    }
    default:
      dispatch(toPost);
      break;
  }
};

/**
 * columns for quandl stocks:
 * 0: "Date"
  1: "Open"
  2: "High"
  3: "Low"
  4: "Close"
  5: "Volume"
  6: "Ex-Dividend"
  7: "Split Ratio"
  8: "Adj. Open"
  9: "Adj. High"
  10: "Adj. Low"
  11: "Adj. Close"
  12: "Adj. Volume"
 */

/**
 *[ {
  "date": "2007-01-03T05:00:00.000Z",
  "open": 29.91,
  "high": 30.25,
  "low": 29.4,
  "close": 29.86,
  "volume": 76935100,
  "SP500Close": 1416.6,
  "AAPLClose": 11.97,
  "GEClose": 37.97
} ]
columns: [
  "date",
  "open",
  "high",
  "low",
  "close",
  "volume",
  "SP500Close",
  "AAPLClose",
  "GEClose"
]


from quandl:
<cache>.dataset.data
 */
