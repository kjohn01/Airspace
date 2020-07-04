import React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const NavBar = () => (
  <AppBar position="static">
    <Toolbar>
      <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" className="title">
        News
      </Typography>
      <Button color="inherit">Login</Button>
    </Toolbar>
  </AppBar>
);

export default NavBar;
