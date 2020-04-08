import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Twemoji from './twemoji';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

function Header() {

    const classes = useStyles();
    return (
        <div id="header">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Twemoji emoji="☕" /> Bay Area Coffee Roasters
                    </Typography>
                    <Button
                        variant="contained"
                        size="small"
                        onClick={() => {
                            window.open('https://docs.google.com/spreadsheets/d/1u7jiqY1qM0jYWugn1dFiW3plQrvWysJqm8xXhO35zuU/edit?usp=sharing', "_blank");
                        }}>
                        Add Roaster
                        </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
