/* eslint-disable max-len */
import React, { useContext } from 'react';
import './styles/App.scss';
import { Spinner } from 'react-bootstrap';
import { NavBar } from './components/components';
import Dashboard from './containers/Dashboard';
import LandingPage from './containers/LandingPage';
import AuthContext from './scripts/Auth/AuthContext';

// const Dashboard = React.lazy(() => import('./containers/Dashboard'));

const App = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <>
      <NavBar />
      {
        // eslint-disable-next-line no-nested-ternary
        authUser
          ? <Dashboard />
          : authUser === undefined
            ? (
              <div className="fixed-center">
                <Spinner animation="border" role="status" variant="secondary">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
            )
            : <LandingPage />
    }
    </>
  );
};
export default App;
