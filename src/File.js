import React from 'react';

const File = (props) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.dataTransfer.dropEffect = "move";
    console.log(e);
  } 

  return <div draggable={true} onDragStart={handleDragStart} className="dropped-files">
    <div>{props.fileName}</div>
    <div>{new Date(props.uploadDate).toString()}</div>
  </div>;
};

export default File;
