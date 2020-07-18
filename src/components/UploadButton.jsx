/* eslint-disable react/forbid-prop-types */
import React, { useRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import uploadFiles from '../scripts/helper_functions';
import AuthContext from '../scripts/Auth/AuthContext';

const UploadButton = ({
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

  const displayControlForSmallBTN = data && data.fileList.length > 0 ? 'd-flex d-md-none' : 'd-none';

  const displayControlForBigBTN = data && data.fileList.length > 0 ? 'd-none d-md-flex' : 'mt-3';

  return (
    <>
      <Button
        size="lg"
        variant={data && data.fileList.length > 0 ? 'secondary' : 'danger'}
        className={`mb-5 mx-auto ${displayControlForBigBTN}`}
        onClick={onButtonClick}
      >
        Choose files
      </Button>
      <Button
        size="lg"
        variant="danger"
        className={`px-2 rounded-pill shadow ${displayControlForSmallBTN}`}
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

UploadButton.propTypes = {
  data: PropTypes.object.isRequired,
  handleClose: PropTypes.func,
  dispatch: PropTypes.func.isRequired,
};

UploadButton.defaultProps = {
  handleClose: () => {},
};

export default UploadButton;
