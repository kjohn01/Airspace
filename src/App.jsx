/* eslint-disable max-len */
import React, {
  useContext, useReducer, Suspense,
} from 'react';
import { Container } from 'react-bootstrap';
import { NavBar, Footer, MySpinner } from './components/components';
import LandingPage from './containers/LandingPage';
import AuthContext from './scripts/Auth/AuthContext';
import reducer from './scripts/reducer';
import './styles/App.scss';

const Dashboard = React.lazy(() => import('./containers/Dashboard'));

const App = () => {
  const [data, dispatch] = useReducer(
    reducer, { dropDepth: 0, inDropZone: false, sortedBy: 'name', order: 'asc' },
  );

  const { authUser } = useContext(AuthContext);

  return (
    <>
      <NavBar dispatch={dispatch} />
      <div className="full-height">
        {
          // eslint-disable-next-line no-nested-ternary
          authUser
            ? (
              <Suspense fallback={<MySpinner />}
              >
                <Dashboard data={data} dispatch={dispatch} />
              </Suspense>
            )
            : authUser === undefined
              ? <Container><MySpinner /></Container>
              : <LandingPage />
        }
      </div>
      <Footer />
    </>
  );
};
export default App;
