import React from 'react'
//import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import './Navstyle.css'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: 'left'
    },
  }));

function Navbar() {

    const classes = useStyles();

    return (

        <AppBar position="static" className="bar">
            <Toolbar>
                <Typography variant="h3" className={classes.title}>
                <Button color="inherit" className='text'>Election Proctor</Button>
                </Typography>
                <Button color="inherit" className='text'>Post</Button>
                <Button color="inherit" className='text'>View Posts</Button>
                <Button color="inherit" className='text'>Register</Button>
            </Toolbar>
        </AppBar>

    );
};

export default Navbar;