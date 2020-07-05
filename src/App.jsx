/* eslint-disable max-len */
import React, { useReducer, useContext } from 'react';
import './styles/App.scss';
import Container from 'react-bootstrap/Container';
import {
  UploadArea, File, NavBar, GlobalAuthState,
} from './components/components';
import reducer from './scripts/reducer';
import AuthContext from './scripts/Auth/AuthContext';

const App = () => {
  const [data, dispatch] = useReducer(
    reducer, { dropDepth: 0, inDropZone: false, fileList: [] },
  );

  const { authUser } = useContext(AuthContext);

  return (
    <GlobalAuthState className="App">
      <NavBar />
      {
        authUser ? (
          <Container>
            <h1 className="text-center text-primary">File manager</h1>
            <UploadArea data={data} dispatch={dispatch} />
            <ol className="dropped-files">
              {data.fileList.map((f) => (
                <File key={f.lastModified} fileName={f.name} uploadDate={f.uploadedAt} />
              ))}
            </ol>
          </Container>
        ) : <h1 className="text-center text-primary">Plx login first</h1>
      }
    </GlobalAuthState>
  );
};

export default App;
