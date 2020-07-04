/* eslint-disable max-len */
import React, { useReducer } from 'react';
import './styles/App.scss';
import Container from 'react-bootstrap/Container';
import { UploadArea, FileList, NavBar } from './components/components';
import reducer from './reducer';

const App = () => {
  const [data, dispatch] = useReducer(
    reducer, { dropDepth: 0, inDropZone: false, fileList: [] },
  );

  return (
    <div className="App">
      <NavBar />
      <Container>
        <h1>File manager</h1>
        <UploadArea data={data} dispatch={dispatch} />
        <FileList data={data} />
      </Container>
    </div>
  );
};

export default App;
