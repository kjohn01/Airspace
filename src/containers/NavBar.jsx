/* eslint-disable import/no-cycle */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar } from '@material-ui/core';
import AuthContext from '../scripts/Auth/AuthContext';
import { SignInWithGoogleBTN, SearchBar, UserControlMenu } from '../components/components';

const NavBar = ({ dispatch }) => {
  const { authUser } = useContext(AuthContext);

  const toolBarClasses = authUser ? 'd-flex justify-content-between' : 'd-flex justify-content-end';

  return (
    <AppBar position="static" className="bg-dark">
      <Toolbar className={toolBarClasses}>
        {
          !authUser ? <SignInWithGoogleBTN className="text-white" /> : (
            <>
              <UserControlMenu userName={authUser.displayName} />
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
