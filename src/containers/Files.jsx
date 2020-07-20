/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { TableBody } from '@material-ui/core';
import { File } from '../components/components';

const Files = ({ fileList }) => {
  const list = fileList.map((f) => (
    <File key={f.name} fileName={f.name} uploadDate={f.lastModified} size={f.size} type={f.type} />
  ));

  return (
    <TableBody>{list}</TableBody>
  );
};

FileList.propTypes = {
  fileList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Files;
