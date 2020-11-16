import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, Typography, Menu, MenuItem,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { signOut } from '../scripts/Auth/auth';

const UserControlMenu = ({ userName }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = async (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
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
        {userName}
      </Typography>
    </div>
  );
};

UserControlMenu.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default UserControlMenu;
