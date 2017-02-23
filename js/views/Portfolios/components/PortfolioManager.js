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
} from '../actions';

import PortfolioEditor from './PortfolioEditor';

class PortfolioManager extends Component {
  static propTypes = {
    rows: PropTypes.array,
    dispatch: PropTypes.func,
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
  render() {
    const {
      portfolioName,
      isOpen,
    } = this.state;
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
            role="button"
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
              role="button"
              className="pt-button pt-icon-add pt-intent-primary"
            >
              Add a Portfolio
            </View>
          </Popover>
        </View>
        <Tabs>
          {this.getTabs()}
          {this.getTabPanels()}
        </Tabs>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    rows: state.portfolios.rows || [],
  };
}

export default connect(mapStateToProps)(PortfolioManager);
