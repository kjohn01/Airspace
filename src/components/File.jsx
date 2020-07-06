import React from 'react';
import PropTypes from 'prop-types';

const File = ({
  fileName, uploadDate, size, type,
}) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.dropEffect = 'move';
  };

  return (
    <div draggable onDragStart={handleDragStart} className="text-primary text-left p-2 m-2 d-flex justify-content-between">
      <div>{fileName}</div>
      <p>
        size:
        {size}
      </p>
      <p>
        type:
        {type}
      </p>
      <div>{new Date(uploadDate).toString()}</div>
    </div>
  );
};

File.propTypes = {
  fileName: PropTypes.string.isRequired,
  uploadDate: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default File;
