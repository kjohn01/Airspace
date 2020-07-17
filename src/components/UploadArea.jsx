/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-param-reassign */
import React, { useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import UploadButton from './UploadButton';
import uploadFiles from '../scripts/helper_functions';
import AuthContext from '../scripts/Auth/AuthContext';
import '../styles/components.scss';

const UploadArea = ({
  data, dispatch, handleClose,
}) => {
  const { uid } = useContext(AuthContext).authUser;

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

    uploadFiles(uid, dispatch, [...e.dataTransfer.files]);
    e.dataTransfer.clearData();
    handleClose();
  }, [handleClose, dispatch, uid]);

  const className = 'p-3 text-center';

  return (
    <div
      className={data.inDropZone ? `${className} inside-drag-area` : className}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      <h3 className="mt-5 text-secondary">Drag files here to upload</h3>
      <h3 className="my-3 text-secondary">or</h3>
      <UploadButton data={data} dispatch={dispatch} handleClose={handleClose} />
    </div>
  );
};

UploadArea.propTypes = {
  data: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
  handleClose: PropTypes.func,
};

UploadArea.defaultProps = {
  handleClose: () => {},
};

export default UploadArea;
