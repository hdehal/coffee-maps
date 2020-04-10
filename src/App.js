import React, { Component } from 'react';
import './App.css';
import { BingProvider } from 'leaflet-geosearch';
import Header from './components/header';
import CoffeeMap from './components/map.js';
import CoffeeTable from './components/table';

// Material-UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const { GoogleSpreadsheet } = require('google-spreadsheet');

// Google Sheets Document ID -- PROD
// const doc = new GoogleSpreadsheet('1u7jiqY1qM0jYWugn1dFiW3plQrvWysJqm8xXhO35zuU');

// Google Sheets Document ID -- DEV
const doc = new GoogleSpreadsheet('1jQI6PstbEArW_3xDnGgPJR6_37r_KjLoa765bOgMBhk');

// Provider for leaflet-geosearch plugin
const provider = new BingProvider({
  params: {
    key: process.env.REACT_APP_BING_MAPS_API_KEY
  },
});

class App extends Component {

  // Initial state
  constructor(props) {
    super(props);

    this.state = {
      dataMaps: []
    }
  }

  componentDidMount() {
    // Google Sheets API
    // Based on https://github.com/theoephraim/node-google-spreadsheet

    var self = this;

    (async function main() {
      // use service account creds
      await doc.useServiceAccountAuth({
        client_email: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY,
      });

      await doc.loadInfo(); // loads document properties and worksheets
      // console.log(doc.title);
      // console.log(sheet.title);
      // console.log(sheet.rowCount);

      const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id]
      const rows = await sheet.getRows(); // can pass in { limit, offset }
      // console.log(rows);

      for (let index in rows) {
        let city = rows[index].City;
        // console.log(city);

        try {
          let providerResult = await provider.search({ query: city + ', CA, United States' });
          rows[index].Coordinates = [providerResult[0].y, providerResult[0].x];
          self.setState({ dataMaps: rows });
        }
        catch (e) {
          console.log(e);
        }
      }

    })();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Paper>
              <CoffeeMap dataMapsProp={this.state.dataMaps} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper>
              <CoffeeTable dataMapsProp={this.state.dataMaps} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
