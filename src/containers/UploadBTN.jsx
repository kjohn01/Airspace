/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */
import React, { useCallback, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button,
} from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import { UploadArea, UploadButton } from '../components/components';
import AuthContext from '../scripts/Auth/AuthContext';

const UploadBTN = ({ data, dispatch }) => {
  const { authUser } = useContext(AuthContext);

  const [show, setShow] = useState(false);
  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  const uploadFiles = useCallback((files) => {
    if (authUser && files && files.length > 0) {
      // Time stamp and check for existing files or updated version
      const newFiles = files.map((f) => {
        f.uploadedAt = Date.now();
        return f;
      });

      console.log(dispatch);

      if (newFiles.length > 0) dispatch({ type: 'UPLOAD_FILES_TO_CLOUD', files: newFiles, uid: authUser.uid });

      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
    }
  }, [dispatch, authUser]);

  return (
    <>
      <Button variant="danger" className="align-self-center d-md-flex d-none rounded-pill shadow" onClick={handleShow}>
        <AddIcon fontSize="large" />
        <p className="font-weight-bolder mr-2 my-1 uploadBtnText">Upload</p>
      </Button>

      <div className="d-flex d-md-none my-3">
        <UploadButton uploadFiles={uploadFiles} handleClose={handleClose} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Uploading your files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadArea data={data} dispatch={dispatch} handleClose={handleClose} uploadFiles={uploadFiles} />
        </Modal.Body>
      </Modal>
    </>
  );
};

UploadBTN.propTypes = {
  data: PropTypes.any.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default UploadBTN;
