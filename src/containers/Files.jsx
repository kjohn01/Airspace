/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { TableBody } from '@material-ui/core';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { File } from '../components/components';

const Files = ({ fileList, dispatch }) => {
  const list = fileList.map((f) => (
    <CSSTransition
      classNames="file"
      key={f.name}
      timeout={1000}
    >
      <File key={f.name} fileName={f.name} uploadDate={f.lastModified} size={f.size} type={f.type} dispatch={dispatch} />
    </CSSTransition>
  ));

  return (
    <TableBody>
      <TransitionGroup enter exit scrollStartThreshold={10} swipeStartThreshold={10} component={null}>
        {list}
      </TransitionGroup>
    </TableBody>
  );
};

FileList.propTypes = {
  fileList: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Files;
