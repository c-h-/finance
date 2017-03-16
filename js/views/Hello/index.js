import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import Icon from '../../components/Icon';

import styles from './styles';

const Hello = () => {
  return (
    <View style={styles.container}>
      <View className="pt-card pt-elevation-2">
        <h2>Hello!</h2>
        <Text style={styles.Text}>
          I built Simple Portfolio Tracker to show me divers asset values in one simple place.
        </Text>
        <Text style={styles.Text} />

        <h3><Icon name="lock" /> Private, Secure, and Open-Source</h3>
        <Text style={styles.Text}>Your finances are your business only. This app never sends your
          financial data anywhere. Keep in mind this means that if you clear your browser, your data
          is gone irrecoverably. Export and back up regularly.
        </Text>
        <Text style={styles.Text}>The only data sent to servers from the app is anonymous usage data
          to help with planning features and gauging usage, as well as anonymous data about any
          errors that happen while using the app, so that bugs can be discovered, prioritized,
          and fixed.
        </Text>
        <Text style={styles.Text}>{'You can review, verify, and contribute to this app\'s codebase '
          + 'via the GitHub repository.'}
        </Text>
        <Text style={styles.Text}>Coming soon: data saved by this app is encrypted locally using
          AES encryption.
        </Text>
        <Text style={styles.Text} />

        <h3><Icon name="view-list" /> Portfolios and Transactions</h3>
        <Text style={styles.Text}>You can also create portfolios with transactions.</Text>
        <Text style={styles.Text}>With transactions you can represent stock
          share purchases or sales.</Text>
        <Text style={styles.Text}>You can also model USD cash assets or
          liabilities with transactions.</Text>
        <Text style={styles.Text}>Lastly, you can model Bitcoin and Ethereum
          holdings in USD with transactions.</Text>
        <Text style={styles.Text} />

        <h3><Icon name="timeline" /> Performance Comparisons and Charts</h3>
        <Text style={styles.Text}>Charts are the heart of this simple app. Mix and
          match your portfolios to see their values change. Cash assets go up and
          down according to transactions. See the USD market value of your holdings
          in stock and cryptocurrency holdings.</Text>
        <Text style={styles.Text}>Use the Comparison mode to see assets side by side, or summing
          mode to easily see the sum of chosen assets.</Text>
        <Text style={styles.Text}>You can look up historical data for any stocks, as well as the
            Bitcoin and Ethereum to US Dollar exchange rate, all alongside portfolios.</Text>
        <Text style={styles.Text}>Easily switch between charts by creating Comparison tabs.</Text>
        <Text style={styles.Text} />

        <h3><Icon name="settings" /> Settings</h3>
        <Text style={styles.Text}>Data is pulled from the excellent meta-database Quandl. You will
            need a proper Quandl API key to pull new data in the Settings page.</Text>
        <Text style={styles.Text} />

        <h3><Icon name="touch-app" /> Caching and Responsiveness</h3>
        <Text style={styles.Text}>This app should remain responsive while loading due to offloading
          data processing and networking to worker threads. You will also get a boost from
          aggressive network caching. Network caching should mean you should never have to request
          the same data twice.
        </Text>

        <h3><Icon name="cloud" /> Data Sources</h3>
        <Text style={styles.Text}>This app pulls data from a variety of APIs. Where possible the app
          APIs that expressly allow the data to be accessed in the way this app requires (Quandl,
          Bing APIs). See the settings page to configure API keys. Other APIs supplement the
          coverage that Quandl and Bing provide.
        </Text>
      </View>
    </View>
  );
};

export default Hello;
