/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-param-reassign */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import UploadButton from './UploadButton';
import '../styles/components.scss';

const UploadArea = ({
  data, dispatch, handleClose, uploadFiles,
}) => {
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
  }, [dispatch, data.dropDepth]);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });
    if (data.dropDepth <= 0) dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  }, [dispatch, data.dropDepth]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    e.dataTransfer.dropEffect = 'copy';
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  }, [dispatch]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    uploadFiles([...e.dataTransfer.files]);
    e.dataTransfer.clearData();
    handleClose();
  }, [uploadFiles, handleClose]);

  const className = 'my-3 p-3 text-center bg-primary rounded shadow';

  return (
    <div
      className={data.inDropZone ? `${className} inside-drag-area` : className}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <p className="text-white">Drag files here to upload</p>
      <UploadButton uploadFiles={uploadFiles} handleClose={handleClose} />
    </div>
  );
};

UploadArea.propTypes = {
  data: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  uploadFiles: PropTypes.func.isRequired,
};

export default UploadArea;
