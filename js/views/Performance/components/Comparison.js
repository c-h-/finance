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
import Select from 'react-select';
import Blueprint from '@blueprintjs/core';
import {
  DateRangePicker,
} from '@blueprintjs/datetime';

import '../../../../node_modules/react-select/dist/react-select.css';
import styles from '../styles';

import parseDate from '../../../utils/parseDate';
import {
  saveComparison,
  fetchUpdatedStats,
} from '../actions';

import misc from '../../../constants/misc.json';
import symbolTypes from '../../../constants/symbolTypes.json';

const {
  Popover,
  PopoverInteractionKind,
} = Blueprint;

const modes = {
  SUM: 0,
  COMPARE: 1,
};

const DELIMITER = misc.DELIMITER;

const now = new Date();
const lastYear = new Date();
lastYear.setFullYear(now.getFullYear() - 1);

class Comparison extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    rows: PropTypes.array,
    id: PropTypes.number,
    dispatch: PropTypes.func,
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
    if (selectedComparison.data && Object.keys(selectedComparison.data).length) {
      this.updateStateFromStore(selectedComparison.data);
    }
  }
  componentWillReceiveProps(nextProps) {
    const selectedComparison = nextProps.tabs.find(row => row.id === nextProps.id);
    if (selectedComparison.data && Object.keys(selectedComparison.data).length) {
      this.updateStateFromStore(selectedComparison.data);
    }
  }
  setSelected = (val) => {
    this.saveState({
      selectedSymbols: val,
    });
  }
  getPortfolios = () => {
    const {
      rows,
    } = this.props;
    return rows.map((row) => {
      return {
        label: row.name,
        value: `${symbolTypes.PORTFOLIO}::${row.id}`,
      };
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
      <View>
        <Text style={styles.Text}>
          Select portfolios and/or symbols to compare performance here.
        </Text>
        <View
          role="navigation"
          className="pt-navbar"
          style={styles.toolbarContainer}
        >
          <View
            style={styles.SelectContainer}
          >
            <Select
              options={this.getPortfolios()}
              value={selectedSymbols}
              onChange={this.setSelected}
              placeholder="Add ticker symbol(s) and/or portfolio(s)..."
              noResultsText="Nothing Found"
              addLabelText="{label}"
              delimiter={DELIMITER}
              autoBlur
              clearable
              allowCreate
              multi
            />
          </View>
          <Popover
            content={
              <DateRangePicker
                value={dates}
                onChange={this.handleDateChange}
                maxDate={now}
                allowSingleDayRange
              />
            }
            interactionKind={PopoverInteractionKind.CLICK}
            onClose={this.closePopover}
            onInteraction={this.openPopover}
            isOpen={isOpen}
            position={Blueprint.Position.BOTTOM}
          >
            <View
              role="button"
              className="pt-button"
              style={styles.button}
            >
              {toRender}
            </View>
          </Popover>
          <select
            onChange={this.handleModeChange}
            value={mode}
            style={{
              borderColor: '#999',
              borderWidth: 1,
              borderStyle: 'solid',
              marginLeft: 10,
              padding: '4px 8px',
            }}
          >
            <option value={modes.SUM}>Sum</option>
            <option value={modes.COMPARE}>Compare</option>
          </select>
          <View className="pt-navbar-divider" />
          <View
            role="button"
            className="pt-button pt-button-primary"
            style={styles.button}
            onClick={this.handleRefresh}
          >
            Compute
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    tabs: state.perfReducer.tabs || [],
    rows: state.portfolios.rows || [],
  };
}

export default connect(mapStateToProps)(Comparison);
