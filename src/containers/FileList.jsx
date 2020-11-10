/* eslint-disable react/forbid-prop-types */
/* eslint-disable max-len */
import React, { Suspense, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { SwipeableList } from '@sandstreamdev/react-swipeable-list';
import { MySpinner } from '../components/components';

// eslint-disable-next-line
const Files = React.lazy(() => import('./Files'));

const FileList = ({ data, dispatch }) => {
  const [sortedBy, setSortedBy] = useState('name');
  const [order, setOrder] = useState('asc');

  useEffect(() => {
    if (data && data.fileList && data.fileList.length > 0) {
      dispatch({ type: 'SORT_FILES', sortedBy, order });
    }
    // eslint-disable-next-line
  }, [sortedBy, order, dispatch]);

  const onSortedByChange = async (newSortedBy) => {
    if (sortedBy !== newSortedBy) {
      await setSortedBy(newSortedBy);
      if (newSortedBy === 'name') await setOrder('asc');
      else await setOrder('desc');
    } else if (order === 'desc') await setOrder('asc');
    else await setOrder('desc');
  };

  return (
    <TableContainer component={Paper} className="shadow-none">
      <SwipeableList threshold={0.5}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <button onClick={() => onSortedByChange('name')}>Name</button>
                {
                  sortedBy === 'name'
                  && (order === 'desc'
                    ? <button onClick={() => setOrder('asc')}><ArrowUpwardIcon fontSize="small" className="mx-1" /></button>
                    : <button onClick={() => setOrder('desc')}><ArrowDownwardIcon fontSize="small" className="mx-1" /></button>)
                }
              </TableCell>
              <TableCell className="table-cell">
                <button onClick={() => onSortedByChange('size')}>Size</button>
                {
                  sortedBy === 'size'
                  && (order === 'desc'
                    ? <button onClick={() => setOrder('asc')}><ArrowDownwardIcon fontSize="small" className="mx-1" /></button>
                    : <button onClick={() => setOrder('desc')}><ArrowUpwardIcon fontSize="small" className="mx-1" /></button>)
                }
              </TableCell>
              <TableCell align="right" className="table-cell">
                <button onClick={() => onSortedByChange('lastModified')}>Last Modified</button>
                {
                  sortedBy === 'lastModified'
                  && (order === 'desc'
                    ? <button onClick={() => setOrder('asc')}><ArrowDownwardIcon fontSize="small" className="mx-1" /></button>
                    : <button onClick={() => setOrder('desc')}><ArrowUpwardIcon fontSize="small" className="mx-1" /></button>)
                }
              </TableCell>
            </TableRow>
          </TableHead>
          <Suspense fallback={<MySpinner />}>
            <Files fileList={data.fileList} dispatch={dispatch} />
          </Suspense>
        </Table>
      </SwipeableList>
    </TableContainer>
  );
};

FileList.propTypes = {
  data: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default FileList;
