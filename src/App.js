import React, { useReducer, Fragment } from 'react';
import './App.css';
import UploadArea from './UploadArea';
import File from './File';
import reducer from './reducer';

const App = () => {

  const [data, dispatch] = useReducer(
    reducer, { dropDepth: 0, inDropZone: false, fileList: [] }
  )

  return (
    <div className="App">
      <h1>File manager</h1>
      <UploadArea data={data} dispatch={dispatch} />
      <Fragment>
        { data.fileList && data.fileList.length > 0 && data.fileList.map(f => f && <File key={f.lastModified} fileName={f.name} uploadDate={f.uploadedAt} />)}
      </Fragment>
    </div>
  );
}

export default App;
