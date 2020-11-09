import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { signInWithGoogle } from '../scripts/Auth/auth';

const SignInWithGoogleBTN = ({
  label, variant, size, className,
}) => (
  <Button color="inherit" variant={variant} size={size} className={className} onClick={signInWithGoogle}>{label}</Button>
);

SignInWithGoogleBTN.propTypes = {
  label: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
};

SignInWithGoogleBTN.defaultProps = {
  label: 'Login',
  variant: 'Primary',
  size: 'lg',
  className: '',
};

export default SignInWithGoogleBTN;
