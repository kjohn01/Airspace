/* eslint-disable max-len */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
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

  return (
    <TableRow key={fileName} draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <TableCell component="th" scope="row">
        {fileName}
      </TableCell>
      <TableCell align="right" className="table-cell">{size}</TableCell>
      <TableCell align="right" className="table-cell">{new Date(uploadDate).toString()}</TableCell>
    </TableRow>
  );
};

File.propTypes = {
  fileName: PropTypes.string.isRequired,
  uploadDate: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default File;
