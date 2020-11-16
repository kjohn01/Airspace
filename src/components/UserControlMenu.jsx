import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  IconButton, Menu, MenuItem, Avatar,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { signOut } from '../scripts/Auth/auth';
import AuthContext from '../scripts/Auth/AuthContext';

const UserControlMenu = ({ className = '' }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { authUser } = useContext(AuthContext);

  const handleMenu = async (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        edge="start"
        className={className}
        onClick={handleMenu}
        color="inherit"
      >
        <Avatar
          src={authUser.photoURL}
          alt={authUser.displayName}
        >
          <AccountCircle />
        </Avatar>
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
    </>
  );
};

UserControlMenu.propTypes = {
  // eslint-disable-next-line react/require-default-props
  className: PropTypes.string,
};

export default UserControlMenu;
