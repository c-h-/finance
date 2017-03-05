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
import Robinhood from '../../utils/Robinhood';

class Settings extends Component {
  static propTypes = {
    settings: PropTypes.object,
    dispatch: PropTypes.func,
  }
  state = {
    quandl: '',
    rh_username: '',
    rh_password: '',
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
  handleRobinhoodClick = () => {
    const r = new Robinhood({
      username: this.state.rh_username,
      password: this.state.rh_password,
    });
    r.then(() => {
      // connected
      r.getQuote('goog').then((body) => {
        console.log('r body', body);
      }, (err) => {
        console.log('quote error', err);
      });
    }, (err) => {
      console.error('error', err);
    });
  }
  render() {
    const {
      quandl,
      rh_username,
      rh_password,
    } = this.state;
    return (
      <View style={styles.container}>
        <h2>Settings</h2>
        <Text style={styles.Text}>Change your settings here.</Text>
        <Text style={styles.Text} />
        <Text style={styles.Text} />
        <View style={styles.container} className="pt-card pt-elevation-1">
          <h4>Quandl</h4>
          <Text style={styles.Text}>Quandl API key</Text>
          <TextInput
            style={styles.TextInput}
            value={quandl || ''}
            onBlur={this.handleBlur('quandl')}
            onChange={this.handleChange('quandl')}
          />
          <Text style={styles.Text} />
          <h4>Robinhood</h4>
          <Text style={styles.Text}>Robinhood credentials</Text>
          <TextInput
            name="username"
            style={styles.TextInput}
            value={rh_username || ''}
            onBlur={this.handleBlur('rh_username')}
            onChange={this.handleChange('rh_username')}
          />
          <TextInput
            name="password"
            style={styles.TextInput}
            value={rh_password || ''}
            onBlur={this.handleBlur('rh_password')}
            onChange={this.handleChange('rh_password')}
            secureTextEntry
          />
          <View
            role="button"
            className="pt-button pt-button-primary"
            style={styles.button}
            onClick={this.handleRobinhoodClick}
          >
            Test Robinhood
          </View>
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
