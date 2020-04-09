import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

class CoffeeTable extends Component {

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