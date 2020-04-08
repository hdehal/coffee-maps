import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const API = 'https://sheets.googleapis.com/v4/spreadsheets/1u7jiqY1qM0jYWugn1dFiW3plQrvWysJqm8xXhO35zuU/values:batchGet?ranges=Sheet1&majorDimension=ROWS&key=' + process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;

class CoffeeTable extends Component {

  // Initial state
  constructor(props) {
    super(props);

    this.state = {
      rows: []
    }
  }

  componentDidMount() {
    // Google Sheets API
    // Based on the helpful demo by https://github.com/kpennell/sheetsdemo
    fetch(API)
      .then(response => response.json())
      .then(data => {
        let batchRowValues = data.valueRanges[0].values;
        const rows = [];

        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        this.setState({ rows: rows });
        // console.log(this.state.items);
      });

  }

  render() {

    if (this.state.rows.length === 0) {
      return null;
    }

    return (
      <TableContainer component={Paper}>
        <Table size="small" stickyHeader aria-label="Coffee Table">
          <TableHead>
            <TableRow>
              <TableCell>Roaster</TableCell>
              <TableCell align="right">City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  <a href={row.url} target="_blank" rel="noopener noreferrer" >
                    {row.roaster}
                  </a>
                </TableCell>
                <TableCell align="right">{row.city}, CA</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default CoffeeTable;