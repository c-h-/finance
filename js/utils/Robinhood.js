import robinhood from 'robinhood';

export default class Robinhood {
  constructor(data) {
    if (data && data.password && data.username) {
      return this.setCredentials(data.username, data.password);
    }
  }

  setCredentials = (username, password) => {
    return new Promise((resolve) => {
      this.username = username;
      this.password = password;
      this.client = robinhood({
        username,
        password,
      }, () => {
        this.connected = true;
        resolve();
      });
    });
  }

  validateClient = () => {
    return Boolean(this.client) && this.connected;
  }

  getQuote = (symbol) => {
    return new Promise((resolve, reject) => {
      if (!this.validateClient()) {
        reject('Unauthorized');
      }
      this.client.quote_data(symbol.toUpperCase(), (err, response, body) => {
        if (err) {
          reject(err);
        }
        else {
          console.log('body', body);
          resolve(body);
        }
      });
    });
  }
}
