import React from 'react';
import {
  View,
  Text,
} from 'react-native';

import styles from './styles';

const Hello = (props) => {
  return (
    <View style={styles.container}>
      <View className="pt-card pt-elevation-2">
        <h2>Hello!</h2>
        <Text style={styles.Text}>Welcome to Simple Portfolio Tracker.</Text>
        <Text style={styles.Text}>
          {'I built Simple Portfolio Tracker to show me my assets\' values in one simple place.'}
        </Text>
        <Text style={styles.Text} />

        <h3>Portfolios and Transactions</h3>
        <Text style={styles.Text}>You can also create portfolios with transactions.</Text>
        <Text style={styles.Text}>With transactions you can represent stock
          share purchases or sales.</Text>
        <Text style={styles.Text}>You can also model USD cash assets or
          liabilities with transactions.</Text>
        <Text style={styles.Text}>Lastly, you can model Bitcoin and Ethereum
          holdings in USD with transactions.</Text>
        <Text style={styles.Text} />

        <h3>Performance Comparisons and Charts</h3>
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

        <h3>Settings</h3>
        <Text style={styles.Text}>Data is pulled from the excellent meta-database Quandl. You will
            need a proper Quandl API key to pull new data in the Settings page.</Text>
        <Text style={styles.Text} />

        <h3>Caching and Responsiveness</h3>
        <Text style={styles.Text}>This app should remain responsive while loading due to offloading
          data processing and networking to worker threads. You will also get a boost from
          aggressive network caching. Network caching should mean you should never have to request
          the same data twice.
        </Text>
      </View>
    </View>
  );
};

export default Hello;
