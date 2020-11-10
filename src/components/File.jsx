/* eslint-disable max-len */
import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import filesize from 'filesize';
import { TableRow, TableCell } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { SwipeableListItem, ActionAnimations } from '@sandstreamdev/react-swipeable-list';
import AuthContext from '../scripts/Auth/AuthContext';
import { deleteFile, downloadFile } from '../scripts/helper_functions';

const File = ({
  fileName, uploadDate, size, dispatch,
}) => {
  const { uid } = useContext(AuthContext).authUser;

  const handleClick = useCallback(() => {
    downloadFile(uid, fileName);
  }, [uid, fileName]);

  const handleDragStart = useCallback((e) => {
    e.dataTransfer.setData('text/plain', fileName);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
  }, [fileName]);

  const handleDragEnd = useCallback((e) => {
    e.dataTransfer.clearData();
  }, []);

  const handleSwipeLeft = useCallback(() => {
    deleteFile(uid, dispatch, fileName);
  }, [uid, dispatch, fileName]);

  const lastModified = moment(uploadDate).fromNow();

  const swipeContent = (
    <div className="swipe-content">
      <h5 className="mb-0">DELETE</h5>
      <DeleteForeverIcon fontSize="large" className="m-3" />
    </div>
  );

  return (
    <TableRow key={fileName} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd} onClick={handleClick}>
      <TableCell component="th" scope="row" className="table-cell">
        {fileName}
      </TableCell>
      <TableCell component="th" scope="row" className="d-block d-md-none p-0">
        <SwipeableListItem
          swipeLeft={{
            content: swipeContent,
            action: () => handleSwipeLeft(),
            actionAnimation: ActionAnimations.REMOVE,
          }}
        >
          <h5>{fileName}</h5>
          <p>{`Modified at: ${lastModified}`}</p>
        </SwipeableListItem>
      </TableCell>
      <TableCell className="table-cell">{filesize(size)}</TableCell>
      <TableCell align="right" className="table-cell">{lastModified}</TableCell>
    </TableRow>
  );
};

File.propTypes = {
  fileName: PropTypes.string.isRequired,
  uploadDate: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default File;
