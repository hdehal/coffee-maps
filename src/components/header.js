import React, { Component } from 'react';
import Twemoji from './twemoji';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TableCount from './tableCount';
import github_mark from '../images/github_mark.png';

class Header extends Component {

    render() {

        const { rowCountProp } = this.props;

        return (
            <div id="header">
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" id="logo">
                            <Twemoji emoji="☕" /> Bay Area Coffee Roasters
                        </Typography>
                        <TableCount rowCountProp={rowCountProp} />
                        <Button
                            variant="contained"
                            size="small"
                            onClick={() => {
                                window.open('https://docs.google.com/spreadsheets/d/1u7jiqY1qM0jYWugn1dFiW3plQrvWysJqm8xXhO35zuU/edit?usp=sharing', "_blank");
                            }}>
                            Add Roaster
                        </Button>
                        <IconButton
                            className="GitHub"
                            variant="outlined"
                            color="link"
                            size="small"
                            onClick={() => {
                                window.open('https://github.com/hdehal/coffee-maps', "_blank");
                            }}>
                            <img className="GitHub" src={github_mark} alt="Hosted on GitHub" />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Header;
