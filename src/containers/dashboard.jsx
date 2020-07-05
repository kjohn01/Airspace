import React, { useReducer, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { UploadArea, File } from '../components/components';
import reducer from '../scripts/reducer';
import AuthContext from '../scripts/Auth/AuthContext';

const Dashboard = () => {
  const [data, dispatch] = useReducer(
    reducer, { dropDepth: 0, inDropZone: false, fileList: [] },
  );
  const { authUser } = useContext(AuthContext);
  if (authUser) {
    return (
      <Container>
        <h1 className="text-center text-primary">File manager</h1>
        <UploadArea data={data} dispatch={dispatch} />
        <ol className="dropped-files">
          {data.fileList.map((f) => (
            <File key={f.lastModified} fileName={f.name} uploadDate={f.uploadedAt} />
          ))}
        </ol>
      </Container>
    );
  }
  return <h1 className="text-center text-primary">Plz login first</h1>;
};

export default Dashboard;
