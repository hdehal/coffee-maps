import React, { Component } from 'react';
import './App.css';
import { BingProvider } from 'leaflet-geosearch';
import Header from './components/header';
import CoffeeMap from './components/map.js';
import CoffeeTable from './components/table';

// Material-UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// Google Sheets API
const API = 'https://sheets.googleapis.com/v4/spreadsheets/1u7jiqY1qM0jYWugn1dFiW3plQrvWysJqm8xXhO35zuU/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=' + process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

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

    // this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    // Google Sheets API
    // Based on the helpful demo by https://github.com/kpennell/sheetsdemo
    fetch(API)
      .then(response => response.json())
      .then(async (data) => {
        let batchRowValues = data.valueRanges[0].values;
        const rows = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        for (let index in rows) {
          let city = rows[index].city;
          // console.log(city);

          try {
            let providerResult = await provider.search({ query: city + ', CA, United States' });
            rows[index].coordinates = [providerResult[0].y, providerResult[0].x];
            this.setState({ dataMaps: rows });
          }
          catch (e) {
            console.log(e);
          }
        }

        // console.log(this.state.dataMaps);
      });
  }

  render() {
    return (
      <div className="App">
        <Header />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Paper>
              <CoffeeMap dataMapsProp={this.dataMaps} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Paper>
              <CoffeeTable />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;
