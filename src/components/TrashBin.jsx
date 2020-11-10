/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-param-reassign */
import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import AuthContext from '../scripts/Auth/AuthContext';
import { deleteFile } from '../scripts/helper_functions';
import '../styles/components.scss';

const TrashBin = ({ data, dispatch }) => {
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
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  }, [dispatch]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.getData('text');
    deleteFile(authUser.uid, dispatch, file);
    e.dataTransfer.clearData();
  }, [dispatch, authUser]);

  const className = 'bg-secondary d-none d-md-block m-2 rounded-circle shadow text-center text-white';

  return (
    <div
      className={data.inDropZone ? `${className} inside-drag-area` : className}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      <DeleteRoundedIcon fontSize="large" className="m-3" />
    </div>
  );
};

TrashBin.propTypes = {
  data: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default TrashBin;
