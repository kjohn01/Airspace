import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';

const UploadInput = ({ uploadFiles, handleClose }) => {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.click();
  };

  const handleSubmit = (e) => {
    const files = [];
    Object.keys(e.target.files).map((index) => files.push(e.target.files[index]));
    uploadFiles(files);
    handleClose();
  };

  return (
    <>
      <Button
        size="lg"
        className="m-3 d-none d-md-flex"
        onClick={onButtonClick}
      >
        Upload from local
      </Button>
      <Button
        size="lg"
        variant="danger"
        className="d-flex d-md-none px-2 rounded-pill shadow"
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
  uploadFiles: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default UploadInput;
