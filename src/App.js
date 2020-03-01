import React, { useReducer } from 'react';
import './App.css';
import DragAndDrop from './DragAndDrop'
import reducer from './reducer';

const App = () => {

  const [data, dispatch] = useReducer(
    reducer, { dropDepth: 0, inDropZone: false, fileList: [] }
  )

  return (
    <div className="App">
      <h1>React drag and drop component</h1>
      <DragAndDrop data={data} dispatch={dispatch} />
      <ol className="dropped-files">
        { data.fileList && data.fileList.length > 0 && data.fileList.map(f => {
          return (
            <li key={f.name}>{f.name}</li>
          )
        })}
      </ol>
    </div>
  );
}

export default App;
