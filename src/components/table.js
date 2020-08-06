import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class CoffeeTable extends Component {

  constructor(props) {
    super(props);
    this.newTab = this.newTab.bind(this);
  }

  // Prevent onClick event bubbling in nested components from opening multiple new tabs
  newTab(e, url) {
    e.preventDefault();
    window.open(url);
  }

  render() {

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
            {this.props.dataMapsProp && this.props.dataMapsProp.map((row) => (
              <TableRow onClick={e => this.newTab(e, row.URL, "_blank")} key={row.Roaster} hover>
                <TableCell component="th" scope="row">
                  <a href={row.URL} target="_blank" rel="noopener noreferrer">
                    {row.Roaster}
                  </a>
                </TableCell>
                <TableCell align="right">{row.City}, CA</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default CoffeeTable;