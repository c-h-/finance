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
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from '@blueprintjs/core';

import styles from '../styles';

import {
  addNewComparison,
} from '../actions';

import PerfTabPanel from './TabPanel';

class TabManager extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    dispatch: PropTypes.func,
    selectedTab: PropTypes.number,
  }
  getTabs = () => {
    const {
      tabs,
    } = this.props;
    return (
      <TabList>
        {tabs.map((row, i) => <Tab>{`Comparison ${i + 1}`}</Tab>)}
      </TabList>
    );
  }
  getTabPanels = () => {
    const {
      tabs,
    } = this.props;
    return tabs.map((row) => {
      return (
        <TabPanel>
          <PerfTabPanel
            id={row.id}
          />
        </TabPanel>
      );
    });
  }
  handleAdd = () => {
    const {
      dispatch,
    } = this.props;
    dispatch(addNewComparison());
  }
  render() {
    const {
      selectedTab,
    } = this.props;
    return (
      <View>
        <Text style={styles.Text}>
          Compare portfolios and symbols here.
        </Text>
        <View
          className="pt-button-group"
          style={styles.buttonContainer}
        >
          <View
            role="button"
            className="pt-button pt-icon-add pt-intent-primary"
            onClick={this.handleAdd}
          >
            New Comparison
          </View>
        </View>
        <Tabs onChange={this.handleTabChange} selectedTabIndex={selectedTab}>
          {this.getTabs()}
          {this.getTabPanels()}
        </Tabs>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    tabs: state.perfReducer.tabs || [],
    selectedTab: state.perfReducer.selectedTab,
  };
}

export default connect(mapStateToProps)(TabManager);
