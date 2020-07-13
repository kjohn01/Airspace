/* eslint-disable max-len */
import React, {
  useReducer, useContext, useEffect, useMemo,
} from 'react';
import Container from 'react-bootstrap/Container';
import { TrashBin, File } from '../components/components';
import UploadBTN from './UploadBTN';
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

  // Implementing useMemo to cache file list to prevent redundant renders
  const list = useMemo(() => {
    if (data.fileList) {
      return data.fileList.map((f) => (
        <File key={f.name} fileName={f.name} uploadDate={f.lastModified} size={f.size} type={f.type} />
      ));
    }
    return null;
  }, [data.fileList]);

  if (authUser) {
    return (
      <Container>
        <h1 className="text-center text-primary">File manager</h1>
        <div className="dropped-files">
          {list}
        </div>
        <div className="d-flex fixed-bottom justify-content-end justify-content-md-between px-3 px-md-5">
          <UploadBTN data={data} dispatch={dispatch} />
          <TrashBin data={data} dispatch={dispatch} />
        </div>
      </Container>
    );
  }
  return <h1 className="text-center text-primary">Plz login first</h1>;
};

export default Dashboard;
