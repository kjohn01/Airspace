/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
import React, { Suspense, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableCell, TableContainer, TableHead, TableRow, Paper, Button,
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { MySpinner } from '../components/components';

const Files = React.lazy(() => import('./Files'));

const FileList = ({ data, dispatch }) => {
  const [sortedBy, setSortedBy] = useState('name');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    if (data && data.fileList && data.fileList.length > 0) {
      dispatch({ type: 'SORT_FILES', sortedBy, order });
    }
  }, [sortedBy, order, dispatch]);

  const onSortedByChange = async (newSortedBy) => {
    if (sortedBy !== newSortedBy) {
      await setSortedBy(newSortedBy);
      await setOrder('desc');
    } else if (order === 'desc') await setOrder('asc');
    else await setOrder('desc');
  };

  return (
    <TableContainer component={Paper} className="shadow-none">
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Button onClick={() => onSortedByChange('name')}>Name</Button>
              {
                sortedBy === 'name'
                && (order === 'desc'
                  ? <Button onClick={() => setOrder('asc')}><ArrowUpwardIcon /></Button>
                  : <Button onClick={() => setOrder('desc')}><ArrowDownwardIcon /></Button>)
              }
            </TableCell>
            <TableCell align="right" className="table-cell">
              <Button onClick={() => onSortedByChange('size')}>Size</Button>
              {
                sortedBy === 'size'
                && (order === 'desc'
                  ? <Button onClick={() => setOrder('asc')}><ArrowDownwardIcon /></Button>
                  : <Button onClick={() => setOrder('desc')}><ArrowUpwardIcon /></Button>)
              }
            </TableCell>
            <TableCell align="right" className="table-cell">
              <Button onClick={() => onSortedByChange('lastModified')}>Last Modified</Button>
              {
                sortedBy === 'lastModified'
                && (order === 'desc'
                  ? <Button onClick={() => setOrder('asc')}><ArrowDownwardIcon /></Button>
                  : <Button onClick={() => setOrder('desc')}><ArrowUpwardIcon /></Button>)
              }
            </TableCell>
          </TableRow>
        </TableHead>
        <Suspense fallback={<MySpinner />}>
          <Files fileList={data.fileList} />
        </Suspense>
      </Table>
    </TableContainer>
  );
};

FileList.propTypes = {
  data: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default FileList;
