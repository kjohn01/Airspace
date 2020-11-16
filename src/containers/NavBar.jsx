/* eslint-disable import/no-cycle */
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Toolbar, IconButton, InputBase, Typography, Menu, MenuItem,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import AuthContext from '../scripts/Auth/AuthContext';
import { signOut } from '../scripts/Auth/auth';
import { SignInWithGoogleBTN } from '../components/components';

const NavBar = ({ dispatch }) => {
  const { authUser } = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = async (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = async (e) => dispatch({ type: 'SEARCH_FILES', searchBy: e.target.value });

  const toolBarClasses = authUser ? 'd-flex justify-content-between' : 'd-flex justify-content-end';

  return (
    <AppBar position="static" className="bg-dark">
      <Toolbar className={toolBarClasses}>
        {
          !authUser ? <SignInWithGoogleBTN className="text-white" /> : (
            <>
              <div className="d-none d-md-flex">
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  edge="start"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={signOut}>Logout</MenuItem>
                </Menu>
                <Typography variant="h6" className="p-2">
                  Welcome
                  {' '}
                  {authUser.displayName}
                </Typography>
              </div>
              <div className="bg-secondary d-flex my-3 p-1 rounded w-100 w-md-auto">
                <div className="px-3 py-1">
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  inputProps={{ 'aria-label': 'search' }}
                  classes={{
                    // root:
                    input: 'text-white',
                  }}
                  onChange={handleSearch}
                />
              </div>
            </>
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
