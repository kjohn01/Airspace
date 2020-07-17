/* eslint-disable react/forbid-prop-types */
import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import uploadFiles from '../scripts/helper_functions';
import AuthContext from '../scripts/Auth/AuthContext';

const UploadInput = ({
  data, dispatch, handleClose,
}) => {
  const { uid } = useContext(AuthContext).authUser;
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.click();
  };

  const handleSubmit = (e) => {
    const files = [];
    Object.keys(e.target.files).map((index) => files.push(e.target.files[index]));
    uploadFiles(uid, dispatch, files);
    handleClose();
  };

  const displayControlForSmallBTN = data.fileList.length > 0 ? 'd-flex d-md-none' : 'd-none';

  return (
    <>
      <Button
        size="lg"
        variant="secondary"
        className={classNames('mb-5 mx-auto', { 'd-none d-md-flex': data.fileList.length > 0 })}
        onClick={onButtonClick}
      >
        Choose files
      </Button>
      <Button
        size="lg"
        variant="danger"
        className={classNames('px-2 rounded-pill shadow', displayControlForSmallBTN)}
        onClick={onButtonClick}
      >
        <AddIcon fontSize="large" />
      </Button>
      <input
        type="file"
        multiple
        ref={inputEl}
        className="d-none"
        onChange={handleSubmit}
      />
    </>
  );
};

UploadInput.propTypes = {
  data: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
  dispatch: PropTypes.object.isRequired,
};

UploadInput.defaultProps = {
  handleClose: () => {},
};

export default UploadInput;
