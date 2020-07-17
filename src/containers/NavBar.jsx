/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AuthContext from '../scripts/Auth/AuthContext';
import { signOut } from '../scripts/Auth/auth';
import { SignInWithGoogleBTN } from '../components/components';

const NavBar = () => {
  const { authUser } = useContext(AuthContext);

  // useEffect(() => {
  //   checkRedirectResult();
  // }, []);

  return (
    <AppBar position="static">
      <Toolbar className="d-flex justify-content-between">
        <div className="d-flex">
          <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="title my-auto">
            News
          </Typography>
        </div>
        {
          !authUser ? <SignInWithGoogleBTN className="text-white" /> : <Button color="inherit" onClick={signOut}>Logout</Button>
        }
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
