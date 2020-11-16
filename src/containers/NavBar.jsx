/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, IconButton, Button, InputBase,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AuthContext from '../scripts/Auth/AuthContext';
import { signOut } from '../scripts/Auth/auth';
import { SignInWithGoogleBTN } from '../components/components';

const NavBar = ({ dispatch }) => {
  const { authUser } = useContext(AuthContext);

  const handleSearch = async (e) => {
    const searchBy = e.target.value;
    console.log(searchBy);
    dispatch({ type: 'SEARCH_FILES', searchBy });
  };

  return (
    <AppBar position="static" className="bg-dark">
      <Toolbar className="d-flex justify-content-between">
        {
          !authUser ? <SignInWithGoogleBTN className="text-white" /> : (
            <div className="d-flex">
              <IconButton edge="start" className="menuButton" color="inherit" aria-label="menu">
                <MenuIcon />
                <Button color="inherit" onClick={signOut}>Logout</Button>
              </IconButton>
              <div>
                <div>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  onChange={handleSearch}
                />
              </div>
            </div>
          )
        }
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default NavBar;
