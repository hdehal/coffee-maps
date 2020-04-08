import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
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
                    <Box edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <span role="img">☕</span>
                    </Box>
                    <Typography variant="h6" className={classes.title}>
                        Bay Area Coffee Roasters
                    </Typography>
                    <Button variant="contained" size="small">Add Roaster</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;
