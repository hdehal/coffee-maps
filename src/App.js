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
const doc = new GoogleSpreadsheet('1u7jiqY1qM0jYWugn1dFiW3plQrvWysJqm8xXhO35zuU');

// Google Sheets Document ID -- DEV
// const doc = new GoogleSpreadsheet('1jQI6PstbEArW_3xDnGgPJR6_37r_KjLoa765bOgMBhk');

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
      dataMaps: [],
      rowCount: ''
    }
  }

  componentDidMount() {
    // Google Sheets API
    // Based on https://github.com/theoephraim/node-google-spreadsheet

    var self = this;

    (async function main() {
      // Use service account creds
      await doc.useServiceAccountAuth({
        client_email: process.env.REACT_APP_GOOGLE_SERVICE_ACCOUNT_EMAIL,
        private_key: process.env.REACT_APP_GOOGLE_PRIVATE_KEY,
      });

      await doc.loadInfo(); // Loads document properties and worksheets

      const sheet = doc.sheetsByIndex[0];
      const rows = await sheet.getRows();

      // Total row count
      self.setState({ rowCount: rows.length });

      rows.forEach((x) => { if (x.Coordinates) { x.mapCoords = JSON.parse(x.Coordinates); } });

      self.setState({ dataMaps: rows });

      var needsUpdates = rows.filter((x) => { return !x.Coordinates; });

      if (needsUpdates && needsUpdates.length > 0) {
        for (let index in needsUpdates) {
          let city = needsUpdates[index].City;

          try {
            let providerResult = await provider.search({ query: city + ', CA, United States' });
            let latlon = [providerResult[0].y, providerResult[0].x];
            needsUpdates[index].Coordinates = JSON.stringify(latlon); // Convert obj to string
            needsUpdates[index].mapCoords = latlon;
            await needsUpdates[index].save(); // Save to remote Google Sheet
          }
          catch (e) {
            console.log(e);
          }
        }

        self.setState({ dataMaps: rows });
      }

    })();
  }

  render() {
    return (
      <div className="App">
        <Header rowCountProp={this.state.rowCount} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Paper id="CoffeeMap">
              <CoffeeMap dataMapsProp={this.state.dataMaps} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper id="CoffeeTable">
              <CoffeeTable dataMapsProp={this.state.dataMaps} />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
