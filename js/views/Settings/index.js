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

import styles from './styles';

import {
  updateSetting,
} from './actions';

class Settings extends Component {
  static propTypes = {
    settings: PropTypes.object,
    dispatch: PropTypes.func,
  }
  state = {
    quandl: '',
  }
  componentWillMount() {
    this.setState({
      ...this.props.settings,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps.settings,
    });
  }
  handleChange = (key) => {
    return (e) => {
      this.setState({
        [key]: e.target.value,
      });
    };
  }
  handleBlur = (key) => {
    const {
      dispatch,
    } = this.props;
    return (e) => {
      dispatch(updateSetting(key, e.target.value));
    };
  }
  render() {
    const {
      quandl,
    } = this.state;
    return (
      <View style={styles.container}>
        <h2>Settings</h2>
        <Text style={styles.Text}>Change your settings here.</Text>
        <Text style={styles.Text} />
        <Text style={styles.Text} />
        <View style={styles.container} className="pt-card pt-elevation-1">
          <Text style={styles.Text}>Quandl API key</Text>
          <TextInput
            style={styles.TextInput}
            value={quandl || ''}
            onBlur={this.handleBlur('quandl')}
            onChange={this.handleChange('quandl')}
          />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings,
  };
}

export default connect(mapStateToProps)(Settings);
