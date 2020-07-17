/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { TableBody } from '@material-ui/core';
import { File } from '../components/components';

const Files = ({ data }) => {
  // Implementing useMemo to cache file list to prevent redundant renders
  const list = useMemo(() => data.fileList.map((f) => (
    <File key={f.name} fileName={f.name} uploadDate={f.lastModified} size={f.size} type={f.type} />
  )), [data.fileList]);

  return (
    <TableBody>{list}</TableBody>
  );
};

FileList.propTypes = {
  data: PropTypes.shape({
    fileList: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
};

export default Files;
