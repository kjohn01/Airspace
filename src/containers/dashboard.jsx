/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable max-len */
import React, {
  useReducer, useContext, useEffect,
} from 'react';
import { Container } from 'react-bootstrap';
import { TrashBin } from '../components/components';
import UploadBTN from './UploadBTN';
import FileList from './FileList';
import reducer from '../scripts/reducer';
import AuthContext from '../scripts/Auth/AuthContext';
import { listenForFiles, detachListener } from '../scripts/database';

const Dashboard = () => {
  const [data, dispatch] = useReducer(
    reducer, { dropDepth: 0, inDropZone: false, fileList: [] },
  );

  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    if (authUser && authUser.uid) listenForFiles(authUser.uid, dispatch);
    return () => {
      if (authUser && authUser.uid) detachListener(authUser.uid);
    };
  }, [authUser]);

  return (
    <Container>
      <h1 className="text-center text-primary">File manager</h1>
      <div className="dropped-files">
        <FileList data={data} />
      </div>
      <div className="d-flex fixed-bottom justify-content-end justify-content-md-between px-3 px-md-5">
        <UploadBTN data={data} dispatch={dispatch} />
        <TrashBin data={data} dispatch={dispatch} />
      </div>
    </Container>
  );
};

export default Dashboard;
