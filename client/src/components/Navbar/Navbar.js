import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Web3Context } from "../../context/Web3Context";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import "./Navstyle.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
  },
}));

function Navbar() {
  const classes = useStyles();
  const { isRegistered, accts, ins } = useContext(Web3Context);

  async function registerVoter() {
    if (!isRegistered) {
      try {
        const response = await ins.methods
          .registerVoter()
          .send({ from: accts });
        alert("registered sucessfully!");
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <AppBar position="static" className="bar">
      <Toolbar>
        <Typography variant="h3" className={classes.title}>
          <Link className="link" to="/">
            <Button color="inherit" className="text">
              Election Proctor
            </Button>
          </Link>
        </Typography>
        <Link className="link" to="/post">
          <Button color="inherit" className="text">
            Feeds
          </Button>
        </Link>
        <Link className="link" to="/uploadpost">
          <Button color="inherit" className="text">
            Report
          </Button>
        </Link>
        {!isRegistered ? (
          <Button onClick={registerVoter} color="inherit" className="text">
            Register
          </Button>
        ) : (
          <Button color="inherit" className="text">
            Welcome!
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
