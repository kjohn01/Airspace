/* eslint-disable max-len */
import React, { useReducer } from 'react';
import './App.css';
import { UploadArea, FileList } from './components/components';
import reducer from './reducer';

const App = () => {
  const [data, dispatch] = useReducer(
    reducer, { dropDepth: 0, inDropZone: false, fileList: [] },
  );

  return (
    <div className="App">
      <h1>File manager</h1>
      <UploadArea data={data} dispatch={dispatch} />
      <FileList data={data} />
    </div>
  );
};

export default App;
