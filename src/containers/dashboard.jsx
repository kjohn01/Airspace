/* eslint-disable react/forbid-prop-types */
/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable max-len */
import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { TrashBin, UploadArea } from '../components/components';
import UploadBTN from './UploadBTN';
import FileList from './FileList';
import AuthContext from '../scripts/Auth/AuthContext';
import { listenForFiles, detachListener } from '../scripts/database';

const Dashboard = ({ data, dispatch }) => {
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    if (authUser && authUser.uid) listenForFiles(authUser.uid, dispatch);
    return () => {
      if (authUser && authUser.uid) detachListener(authUser.uid);
    };
  }, [authUser, dispatch]);

  console.log('dashboard');
  console.log(data);

  return data.fileList.length > 0 ? (
    <Container className="mt-3">
      <div className="dropped-files">
        <FileList data={data} />
      </div>
      <div className="d-flex fixed-bottom justify-content-end justify-content-md-between px-3 px-md-5">
        <UploadBTN data={data} dispatch={dispatch} />
        <TrashBin data={data} dispatch={dispatch} />
      </div>
    </Container>
  ) : <UploadArea data={data} dispatch={dispatch} />;
};

Dashboard.propTypes = {
  data: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Dashboard;
