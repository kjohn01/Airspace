import React, { useCallback, useState } from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import { UploadArea } from '../components/components';

const UploadBTN = (data, dispatch) => {
  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  return (
    <>
      <Button variant="danger" className="d-none d-md-flex px-2 rounded-pill shadow" onClick={handleShow}>
        <AddIcon fontSize="large" />
        <p className="font-weight-bolder mr-2 my-1 uploadBtnText">Upload</p>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Uploading your files</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UploadArea data={data} dispatch={dispatch} />
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
};

export default UploadBTN;
