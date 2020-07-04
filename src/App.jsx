/* eslint-disable max-len */
import React, { useReducer } from 'react';
import './styles/App.scss';
import Container from 'react-bootstrap/Container';
import { UploadArea, File, NavBar } from './components/components';
import reducer from './reducer';

const App = () => {
  const [data, dispatch] = useReducer(
    reducer, { dropDepth: 0, inDropZone: false, fileList: [] },
  );

  return (
    <div className="App">
      <NavBar />
      <Container>
        <h1 className="text-center text-primary">File manager</h1>
        <UploadArea data={data} dispatch={dispatch} />
        <ol className="dropped-files">
          {data.fileList.map((f) => (
            <File key={f.lastModified} fileName={f.name} uploadDate={f.uploadedAt} />
          ))}
        </ol>
      </Container>
    </div>
  );
};

export default App;
