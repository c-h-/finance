import React, {
  Component,
  PropTypes,
} from 'react';
import {
  View,
  Text,
  TextInput,
} from 'react-native';
import {
  connect,
} from 'react-redux';
import {
  Popover,
  PopoverInteractionKind,
  Tab,
  Tabs,
  TabList,
  TabPanel,
} from '@blueprintjs/core';

// add blueprint table css
import '../../../../node_modules/@blueprintjs/table/dist/table.css';
import styles from '../styles';

import {
  addPortfolio,
  switchTabs,
  exportExcelDoc,
} from '../actions';

import PortfolioEditor from './PortfolioEditor';

class PortfolioManager extends Component {
  static propTypes = {
    rows: PropTypes.array,
    dispatch: PropTypes.func,
    selectedTabID: PropTypes.number,
  }
  state = {
    portfolioName: '',
    isOpen: false,
  }
  getTabs = () => {
    const {
      rows,
    } = this.props;
    return (
      <TabList>
        {rows.map(row => <Tab>{row.name}</Tab>)}
      </TabList>
    );
  }
  getTabPanels = () => {
    const {
      rows,
    } = this.props;
    return rows.map((row) => {
      return (
        <TabPanel>
          <PortfolioEditor
            id={row.id}
          />
        </TabPanel>
      );
    });
  }
  addPortfolio = () => {
    const {
      dispatch,
    } = this.props;
    const {
      portfolioName,
    } = this.state;
    this.closePopover();
    dispatch(addPortfolio(portfolioName));
    this.setState({
      portfolioName: '',
    });
  }
  handlePortfolioNameChange = (e) => {
    this.setState({
      portfolioName: e.target.value,
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
  handleTabChange = (newIndex) => {
    const {
      dispatch,
      rows,
    } = this.props;
    dispatch(switchTabs(rows[newIndex].id));
  }
  exportExcel = () => {
    const {
      dispatch,
    } = this.props;
    dispatch(exportExcelDoc());
  }
  render() {
    const {
      portfolioName,
      isOpen,
    } = this.state;
    const {
      rows,
      selectedTabID,
    } = this.props;
    let selectedTabIndex = 0;
    for (const i in rows) {
      if (rows[i].id === selectedTabID) {
        selectedTabIndex = parseInt(i, 10);
        break;
      }
    }
    const addPortfolioPopoverContent = (
      <View className="pt-card">
        <Text>Name</Text>
        <TextInput
          style={styles.TextInput}
          value={portfolioName}
          onChange={this.handlePortfolioNameChange}
        />
        <View
          className="pt-button-group"
          style={styles.buttonContainer}
        >
          <View
            onClick={this.addPortfolio}
            accessibilityRole="button"
            className="pt-button pt-icon-endorsed pt-intent-primary"
          >
            Save
          </View>
        </View>
      </View>
    );
    return (
      <View>
        <Text style={styles.Text}>
          {'Manage your portfolios here. Add and edit your portfolio\'s transactions in the table.'}
        </Text>
        <View
          className="pt-button-group"
          style={styles.buttonContainer}
        >
          <Popover
            content={addPortfolioPopoverContent}
            interactionKind={PopoverInteractionKind.CLICK}
            onClose={this.closePopover}
            onInteraction={this.openPopover}
            isOpen={isOpen}
          >
            <View
              accessibilityRole="button"
              className="pt-button pt-icon-add pt-intent-primary"
            >
              Add a Portfolio
            </View>
          </Popover>
          <View
            accessibilityRole="button"
            className="pt-button pt-icon-export"
            onClick={this.exportExcel}
          >
            Export all to Excel (.xlsx)
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
    rows: state.portfolios.rows || [],
    selectedTabID: state.portfolios.selectedTabID,
  };
}

export default connect(mapStateToProps)(PortfolioManager);
