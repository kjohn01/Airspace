import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

const File = ({
  fileName, uploadDate, size, type,
}) => {
  const handleDragStart = useCallback((e) => {
    e.dataTransfer.setData('text/plain', fileName);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
  }, [fileName]);

  const handleDragEnd = useCallback((e) => {
    e.dataTransfer.clearData();
  }, []);

  return (
    <div draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} className="text-primary text-left p-2 m-2 d-flex justify-content-between">
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
