/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@material-ui/core';
import { File } from '../components/components';

const FileList = ({ data }) => {
  // Implementing useMemo to cache file list to prevent redundant renders
  const list = useMemo(() => {
    if (data.fileList) {
      return data.fileList.map((f) => (
        <File key={f.name} fileName={f.name} uploadDate={f.lastModified} size={f.size} type={f.type} />
      ));
    }
    return null;
  }, [data.fileList]);

  return (
    <TableContainer component={Paper} className="shadow-none">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right" className="table-cell">size</TableCell>
            <TableCell align="right" className="table-cell">Last Modified</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

FileList.propTypes = {
  data: PropTypes.any.isRequired,
};

export default FileList;
