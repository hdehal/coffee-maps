import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import CoffeeMap from './components/map.js';
import CoffeeTable from './components/table';

// Material-UI
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8}>
            <Paper>
              <CoffeeMap />
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
