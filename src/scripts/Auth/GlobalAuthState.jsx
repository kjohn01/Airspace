/* eslint-disable import/no-named-as-default */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { listenForAuthUser } from './auth';
import AuthContext from './AuthContext';

const GlobalAuthState = (props) => {
  const [authUser, setAuthUser] = useState(undefined);

  useEffect(() => {
    listenForAuthUser((newAuthUser) => {
      setAuthUser(newAuthUser);
    });
    return () => {
      // TODO: clear user presence on firestore
      setAuthUser(null);
    };
  }, []);

  const { children } = props;
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};

GlobalAuthState.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};

export default GlobalAuthState;
