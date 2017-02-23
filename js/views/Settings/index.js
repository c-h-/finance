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

class Settings extends Component {
  static propTypes = {
    settings: PropTypes.obj,
  }
  state = {
    quandl: '',
  }
  componentWillReceiveProps(nextProps) {
    const {
      settings,
    } = nextProps;
    this.setState({
      ...settings,
    });
  }
  render() {
    const {
      quandl,
    } = this.state;
    return (
      <View style={styles.container}>
        <h2>Translated greeting:</h2>
        <Text style={styles.Text}>Change your settings here.</Text>
        <Text style={styles.Text}>Quandl API key</Text>
        <TextInput
          style={styles.TextInput}
          value={symbol || ''}
          onChange={this.handleChange('symbol')}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings.data,
  };
}

export default connect(mapStateToProps)(Settings);
