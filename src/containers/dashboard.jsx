/* eslint-disable max-len */
import React, { useReducer, useContext, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import { UploadArea, File } from '../components/components';
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

  if (authUser) {
    return (
      <Container>
        <h1 className="text-center text-primary">File manager</h1>
        <UploadArea data={data} dispatch={dispatch} />
        <ol className="dropped-files">
          {data.fileList.map((f) => (
            <File key={f.name} fileName={f.name} uploadDate={f.lastModified} size={f.size} type={f.type} />
          ))}
        </ol>
      </Container>
    );
  }
  return <h1 className="text-center text-primary">Plz login first</h1>;
};

export default Dashboard;
