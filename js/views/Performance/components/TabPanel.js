import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
} from 'react-native';
import {
  connect,
} from 'react-redux';
import { AsyncCreatable } from 'react-select';
import Blueprint from '@blueprintjs/core';
import {
  DateRangePicker,
} from '@blueprintjs/datetime';

import '../../../../node_modules/react-select/dist/react-select.css';
import styles from '../styles';

import parseDate from '../../../utils/parseDate';
import getTickerAutocomplete from '../../../utils/getTickerAutocomplete';
import {
  fetchUpdatedStats,
  saveComparison,
} from '../actions';
import ChartContainer from './Chart';
import StatBlocks from './StatBlocks';

import {
  chartModes,
  DELIMITER,
  SYM_DELIMETER,
} from '../../../constants/misc.json';
import symbolTypes from '../../../constants/symbolTypes.json';
import ActionTypes from '../../../redux/action_types.json';

const {
  Popover,
  PopoverInteractionKind,
  ProgressBar,
} = Blueprint;

const modes = chartModes;

const now = new Date();
const lastYear = new Date();
lastYear.setFullYear(now.getFullYear() - 1);

class TabPanel extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    rows: PropTypes.array,
    dispatch: PropTypes.func,
    id: PropTypes.number,
    numFetching: PropTypes.number,
    totalFetching: PropTypes.number,
    route: PropTypes.string,
  }
  /**
   * Renders a value
   */
  static valueRenderer(option) {
    const ind = option.value.indexOf(SYM_DELIMETER);
    if (ind === -1) {
      return option.value;
    }
    else {
      const type = option.value.slice(0, ind);
      if (type !== symbolTypes.PORTFOLIO) {
        return option.value.slice(ind + SYM_DELIMETER.length);
      }
    }
    return option.label;
  }
  /**
   * Creates User Input Prompt Text
   */
  static promptTextCreator(input) {
    return `Use "${input.toUpperCase()}"`;
  }
  /**
   * Creates new option for Select
   */
  static newOptionCreator(option) {
    const value = option.label.indexOf('Use "') > -1
      ? option.label.slice(5).slice(0, -1)
      : option.label;
    return {
      ...option,
      label: `Use "${value.toUpperCase()}"`,
      name: 'User Input',
      exchDisp: 'Symbol',
      value: `${symbolTypes.USER_INPUT}${SYM_DELIMETER}${value}`,
    };
  }
  /**
   * Renders option for Select
   */
  static optionRenderer(option) {
    return (
      <View style={styles.option}>
        <Text style={styles.optionLabel}>
          {option.label}
          <Text style={styles.optionName}>{option.name ? `   ${option.name}` : ''}</Text>
        </Text>
        {
          option.exchDisp &&
          <Text>{option.exchDisp}</Text>
        }
      </View>
    );
  }
  state = {
    selectedSymbols: '',
    isOpen: false,
    dates: [
      lastYear,
      now,
    ],
    mode: modes.SUM,
  }
  componentWillMount() {
    const selectedComparison = this.props.tabs.find(row => row.id === this.props.id);
    if (
      selectedComparison
      && selectedComparison.data
      && Object.keys(selectedComparison.data).length
    ) {
      this.updateStateFromStore(selectedComparison.data);
    }
  }
  componentWillReceiveProps(nextProps) {
    const selectedComparison = nextProps.tabs.find(row => row.id === nextProps.id);
    if (
      selectedComparison
      && selectedComparison.data
      && Object.keys(selectedComparison.data).length
    ) {
      this.updateStateFromStore(selectedComparison.data);
    }
  }
  /**
   * Gets ticker options for autocomplete
   */
  getOptions = (input) => {
    return new Promise((resolve) => {
      const {
        dispatch,
      } = this.props;
      const portfolios = this.getPortfolios();
      const finish = (opts) => {
        resolve({
          options: opts
            ? [
              ...opts,
              ...portfolios.filter((port) => {
                return port.label.toLowerCase().indexOf(input.toLowerCase()) > -1;
              }),
            ]
            : portfolios,
        });
      };
      if (typeof input === 'string' && input.length) {
        // get autocomplete options
        getTickerAutocomplete(input)
          .then((resp) => {
            if (resp && resp.ResultSet && resp.ResultSet.Result) {
              finish(resp.ResultSet.Result.map((ticker) => {
                return {
                  label: ticker.symbol,
                  value: `${ticker.type.toUpperCase()}${SYM_DELIMETER}${ticker.symbol}`,
                  exchDisp: ticker.exchDisp,
                  name: ticker.name,
                };
              }));
            }
            else {
              finish();
            }
          }, (err) => {
            dispatch({
              type: ActionTypes.ERROR,
              payload: {
                msg: err,
              },
            });
            finish();
          });
      }
      else {
        finish();
      }
    });
  }
  getPortfolios = () => {
    const {
      rows,
    } = this.props;
    return rows.map((row) => {
      return {
        label: row.name,
        value: `${symbolTypes.PORTFOLIO}${SYM_DELIMETER}${row.id}`,
        name: 'User Input',
        exchDisp: 'Portfolio',
      };
    });
  }
  setSelected = (val) => {
    this.saveState({
      selectedSymbols: val,
    });
  }
  updateStateFromStore = (newState) => {
    const toUpdate = {
      ...newState,
    };
    if (typeof toUpdate.dates[0] === 'string') {
      toUpdate.dates[0] = new Date(toUpdate.dates[0]);
    }
    if (typeof toUpdate.dates[1] === 'string') {
      toUpdate.dates[1] = new Date(toUpdate.dates[1]);
    }
    this.setState(newState);
  }
  saveState = (newState) => {
    const {
      dispatch,
      id,
    } = this.props;
    this.setState(newState, () => {
      const toSave = {
        ...this.state,
      };
      delete toSave.isOpen;
      dispatch(saveComparison(id, toSave));
    });
  }
  handleDateChange = (dates) => {
    this.saveState({
      dates,
    });
  }
  openPopover = () => {
    this.setState({
      isOpen: true,
    });
  }
  closePopover = () => {
    this.setState({
      isOpen: false,
    });
  }
  handleModeChange = (e) => {
    this.saveState({
      mode: parseInt(e.target.value, 10),
    });
  }
  handleRefresh = () => {
    // intention is to see updated charts from new selection
    const {
      dispatch,
      id,
    } = this.props;
    dispatch(fetchUpdatedStats(id, this.state));
  }

  render() {
    const {
      selectedSymbols,
      dates,
      isOpen,
      mode,
    } = this.state;
    const {
      numFetching,
      totalFetching,
      route,
    } = this.props;
    const date1Valid = dates[0] && typeof dates[0] === 'object';
    const date2Valid = dates[1] && typeof dates[1] === 'object';
    let toRender = <Text>Tap to select date range</Text>;
    if (date1Valid && date2Valid) {
      toRender = (
        <Text>
          {`${parseDate(dates[0])} - ${parseDate(dates[1])}`}
        </Text>
      );
    }
    else if (date1Valid) {
      toRender = (
        <Text>
          {parseDate(dates[0])}
        </Text>
      );
    }
    else if (date2Valid) {
      toRender = (
        <Text>
          {parseDate(dates[1])}
        </Text>
      );
    }

    return (
      <View className="pt-card pt-elevation-1">
        <View
          accessibilityRole="navigation"
          style={styles.toolbarContainer}
        >
          <View
            style={[styles.SelectContainer, styles.toolbarChild]}
          >
            <Text style={styles.Text}>Symbols and/or Portfolios</Text>
            {/*
            instead of options, use loadOptions for async option loading.
            https://github.com/JedWatson/react-select#async-options
            old way: options={this.getPortfolios()}
            */}
            <AsyncCreatable
              promptTextCreator={TabPanel.promptTextCreator}
              newOptionCreator={TabPanel.newOptionCreator}
              valueRenderer={TabPanel.valueRenderer}
              loadOptions={this.getOptions}
              value={selectedSymbols}
              onChange={this.setSelected}
              placeholder="Add ticker symbol(s) and/or portfolio(s)..."
              noResultsText="Nothing Found"
              addLabelText="{label}"
              delimiter={DELIMITER}
              optionRenderer={TabPanel.optionRenderer}
              autoBlur
              clearable
              multi
            />
          </View>
          <View style={styles.toolbarChild}>
            <Text style={styles.Text}>Date Range</Text>
            <Popover
              content={
                <DateRangePicker
                  value={dates}
                  onChange={this.handleDateChange}
                  maxDate={now}
                  allowSingleDayRange={false}
                />
              }
              interactionKind={PopoverInteractionKind.CLICK}
              onClose={this.closePopover}
              onInteraction={this.openPopover}
              isOpen={isOpen}
              position={Blueprint.Position.BOTTOM}
            >
              <View
                accessibilityRole="button"
                className="pt-button"
                style={styles.button}
              >
                {toRender}
              </View>
            </Popover>
          </View>
          <View style={styles.toolbarChild}>
            <Text style={styles.Text}>Chart Mode</Text>
            <select
              onChange={this.handleModeChange}
              value={mode}
              style={{
                borderColor: '#999',
                borderWidth: 1,
                borderStyle: 'solid',
                padding: '4px 8px',
                height: 35,
              }}
            >
              <option value={modes.SUM}>Sum</option>
              <option value={modes.COMPARE}>Compare</option>
            </select>
          </View>
          <View
            accessibilityRole="button"
            className="pt-button pt-button-primary"
            style={styles.button}
            onClick={this.handleRefresh}
          >
            Compute
          </View>
        </View>
        {
          numFetching > 0 &&
          <View style={{ position: 'relative' }}>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                zIndex: 1,
              }}
            >
              <ProgressBar
                intent={Blueprint.Intent.PRIMARY}
                value={1 - (numFetching / totalFetching)}
              />
            </View>
          </View>
        }
        { /* Route passing here gets the component to re-render so the chart updates */ }
        <ChartContainer route={route} />
        <StatBlocks />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    tabs: state.perfReducer.tabs || [],
    rows: state.portfolios.rows || [],
    id: state.perfReducer.selectedTabID,
    route: state.transient.browserRoute,
    numFetching: state.transient
      && state.transient.fetching
      && state.transient.fetching.perfReducer
      && typeof state.transient.fetching.perfReducer.numFetching === 'number'
      ? state.transient.fetching.perfReducer.numFetching
      : 0,
    totalFetching: state.transient
      && state.transient.fetching
      && state.transient.fetching.perfReducer
      && typeof state.transient.fetching.perfReducer.totalFetching === 'number'
      ? state.transient.fetching.perfReducer.totalFetching
      : 0,
  };
}

export default connect(mapStateToProps)(TabPanel);
