/* eslint-disable arrow-body-style */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable max-len */
import React, { useEffect, useContext, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { TrashBin, UploadArea, MySpinner } from '../components/components';
import AuthContext from '../scripts/Auth/AuthContext';
import { listenForFiles, clearOnlinePresence, createOnlinePresence } from '../scripts/database';

const FileList = React.lazy(() => import('./FileList'));
const UploadBTN = React.lazy(() => import('./UploadBTN'));

const Dashboard = ({ data, dispatch }) => {
  const { authUser } = useContext(AuthContext); 
  useEffect(() => {
    let cleanUp = () => {};
    if (authUser && authUser.uid) {
      const { uid, displayName } = authUser
      createOnlinePresence(uid, displayName);
      listenForFiles(uid, dispatch);
      cleanUp = () => clearOnlinePresence(uid);
      window.addEventListener('beforeunload', cleanUp);
    }
    return () => {
      window.removeEventListener('beforeunload', cleanUp);
    };
  }, [authUser, dispatch]);

  if (data && data.fileList && data.fileList.length === 0) return <UploadArea data={data} dispatch={dispatch} />;

  if (data && data.fileList && data.fileList.length >= 0) {
    return (
      <Suspense fallback={<MySpinner />}>
        <Container className="mt-3">
          <div className="dropped-files">
            <FileList data={data} dispatch={dispatch} />
          </div>
          <div className="d-flex fixed-bottom justify-content-end justify-content-md-between px-3 px-md-5">
            <UploadBTN data={data} dispatch={dispatch} />
            <TrashBin data={data} dispatch={dispatch} />
          </div>
        </Container>
      </Suspense>
    );
  }

  return <MySpinner />;
};

Dashboard.propTypes = {
  data: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Dashboard;
