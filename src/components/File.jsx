/* eslint-disable max-len */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import filesize from 'filesize';
import { TableRow, TableCell } from '@material-ui/core';

const File = ({
  fileName, uploadDate, size,
}) => {
  const handleDragStart = useCallback((e) => {
    e.dataTransfer.setData('text/plain', fileName);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.dropEffect = 'move';
  }, [fileName]);

  const handleDragEnd = useCallback((e) => {
    e.dataTransfer.clearData();
  }, []);

  const lastModified = moment(uploadDate).fromNow();

  return (
    <TableRow key={fileName} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <TableCell component="th" scope="row" className="table-cell">
        {fileName}
      </TableCell>
      <TableCell component="th" scope="row" className="d-block d-md-none">
        <h5>{fileName}</h5>
        <p>{`Modified at: ${lastModified}`}</p>
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
};

export default File;
