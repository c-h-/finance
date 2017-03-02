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
  switchTabs,
} from '../actions';

import PerfTabPanel from './TabPanel';

class TabManager extends Component {
  static propTypes = {
    tabs: PropTypes.array,
    dispatch: PropTypes.func,
    selectedTabID: PropTypes.number,
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
    return tabs.map(() => {
      return (
        <TabPanel>
          <PerfTabPanel />
        </TabPanel>
      );
    });
  }
  handleTabChange = (newIndex) => {
    const {
      dispatch,
      tabs,
    } = this.props;
    dispatch(switchTabs(tabs[newIndex].id));
  }
  handleAdd = () => {
    const {
      dispatch,
    } = this.props;
    dispatch(addNewComparison());
  }
  render() {
    const {
      selectedTabID,
      tabs,
    } = this.props;
    let selectedTabIndex = 0;
    for (const i in tabs) {
      if (tabs[i].id === selectedTabID) {
        selectedTabIndex = parseInt(i, 10);
        break;
      }
    }
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
        <Text style={styles.Text} />
        <Text style={styles.Text} />
        <View className="pt-card pt-elevation-1">
          <Tabs onChange={this.handleTabChange} selectedTabIndex={selectedTabIndex}>
            {this.getTabs()}
            {this.getTabPanels()}
          </Tabs>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    tabs: state.perfReducer.tabs || [],
    selectedTabID: state.perfReducer.selectedTabID,
  };
}

export default connect(mapStateToProps)(TabManager);
