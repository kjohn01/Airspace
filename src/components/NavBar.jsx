import React, { useContext } from 'react';
import {
  AppBar, Toolbar, IconButton, Typography, Button,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import AuthContext from '../scripts/Auth/AuthContext';
import { signInWithGoogle, signOut } from '../scripts/Auth/auth';

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
          !authUser ? <Button color="inherit" onClick={signInWithGoogle}>Login</Button> : <Button color="inherit" onClick={signOut}>Logout</Button>
        }
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
