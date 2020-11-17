/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import AuthContext from '../scripts/Auth/AuthContext';
import { SignInWithGoogleBTN, SearchBar, UserControlMenu } from '../components/components';
import HotBallonLogo from '../resource/Icons/HotAirBalloon';

const NavBar = ({ dispatch }) => {
  const { authUser } = useContext(AuthContext);

  return (
    <AppBar position="static" className="bg-dark">
      <Toolbar className="d-flex justify-content-between">
        {
          !authUser ? (
            <>
              <HotBallonLogo
                width="40"
                height="40"
                className="p-1"
              />
              {
                authUser !== undefined && <SignInWithGoogleBTN className="text-white" />
              }
            </>
          )
            : (
              <>
                <div className="d-none d-md-flex">
                  <UserControlMenu />
                  <Typography variant="h6" className="p-3">
                    Welcome
                    {' '}
                    {authUser.displayName}
                  </Typography>
                </div>
                <SearchBar dispatch={dispatch} />
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
