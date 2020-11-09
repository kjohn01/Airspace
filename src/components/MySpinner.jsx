import React from 'react';
import { Spinner } from 'react-bootstrap';

const MySpinner = () => (
  <div className="fixed-center">
    <Spinner animation="border" role="status" variant="secondary">
      <span className="sr-only">Loading...</span>
    </Spinner>
  </div>
);

export default MySpinner;
