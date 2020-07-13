/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-param-reassign */
import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../scripts/Auth/AuthContext';
import '../styles/components.scss';

const UploadArea = ({ data, dispatch }) => {
  const { authUser } = useContext(AuthContext);
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

    const files = [...e.dataTransfer.files];

    if (authUser && files && files.length > 0) {
      // Time stamp and check for existing files or updated version
      let newFiles = files.map((f) => {
        f.uploadedAt = Date.now();
        return f;
      });

      newFiles = newFiles.filter((f) => {
        const i = data.fileList.findIndex((ef) => ef.name === f.name);
        return i < 0 || data.fileList[i].uploadedAt < f.uploadedAt;
      });
      if (newFiles.length > 0) dispatch({ type: 'UPLOAD_FILES_TO_CLOUD', files: newFiles, uid: authUser.uid });

      e.dataTransfer.clearData();
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
    }
  }, [dispatch, authUser, data.fileList]);

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
    </div>
  );
};

UploadArea.propTypes = {
  data: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default UploadArea;
