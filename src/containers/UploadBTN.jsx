/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable react/forbid-prop-types */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Modal, Button,
} from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import { UploadArea, UploadButton } from '../components/components';

const UploadBTN = ({ data, dispatch }) => {
  const [show, setShow] = useState(false);
  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  return (
    <>
      <Button variant="danger" className="align-self-center d-md-flex d-none rounded-pill shadow" onClick={handleShow}>
        <AddIcon fontSize="large" />
        <p className="font-weight-bolder mr-2 my-1 uploadBtnText">Upload</p>
      </Button>

      <div className="d-flex d-md-none my-3">
        <UploadButton data={data} dispatch={dispatch} handleClose={handleClose} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="pt-5">
          <UploadArea data={data} dispatch={dispatch} handleClose={handleClose} />
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
