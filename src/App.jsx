/* eslint-disable max-len */
import React, {
  useContext, useReducer, Suspense,
} from 'react';
import { Spinner, Container } from 'react-bootstrap';
import { NavBar, Footer } from './components/components';
// import Dashboard from './containers/Dashboard';
import LandingPage from './containers/LandingPage';
import AuthContext from './scripts/Auth/AuthContext';
import reducer from './scripts/reducer';

import './styles/App.scss';

const Dashboard = React.lazy(() => import('./containers/Dashboard'));

const App = () => {
  const [data, dispatch] = useReducer(
    reducer, { dropDepth: 0, inDropZone: false, fileList: [] },
  );

  const { authUser } = useContext(AuthContext);

  console.log('App');
  console.log(authUser);
  console.log(data);

  return (
    <>
      <NavBar />
      {
        // eslint-disable-next-line no-nested-ternary
        authUser
          ? (
            <Suspense fallback={(
              <div className="fixed-center">
                <Spinner animation="border" role="status" variant="secondary">
                  <span className="sr-only">Loading...</span>
                </Spinner>
              </div>
          )}
            >
              <Dashboard data={data} dispatch={dispatch} />
            </Suspense>
          )
          : authUser === undefined
            ? (
              <Container>
                <div className="fixed-center">
                  <Spinner animation="border" role="status" variant="secondary">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </div>
              </Container>
            )
            : <LandingPage />
      }
      <Footer />
    </>
  );
};
export default App;
