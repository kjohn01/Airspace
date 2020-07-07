/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-param-reassign */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AuthContext from '../scripts/Auth/AuthContext';
import '../styles/components.scss';

const TrashBin = ({ data, dispatch }) => {
  const { authUser } = useContext(AuthContext);
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });
    if (data.dropDepth <= 0) dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.getData('text');
    if (authUser && file) {
      dispatch({ type: 'DELETE_FILES_FROM_CLOUD', file, uid: authUser.uid });
      console.log(`Deleted file: ${file}`);
      e.dataTransfer.clearData();
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
    }
  };

  const className = 'my-3 p-3 text-center bg-danger rounded shadow';

  return (
    <div
      className={data.inDropZone ? `${className} inside-drag-area` : className}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      <p className="text-white">Drag files here to delete</p>
    </div>
  );
};

TrashBin.propTypes = {
  data: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default TrashBin;
