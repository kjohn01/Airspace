/* eslint-disable max-len */
import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import { SignInWithGoogleBTN } from '../components/components';

const DESCRIPTION = 'This is a simple cloud storage web app that allows you to access your files any time any where with ease.';

const LandingPage = () => (
  <Jumbotron fluid className="wallpaper full-height">
    <Container className="mt-5 pt-5 px-5">
      <h1>Welcome to AirSpace</h1>
      <h4 className="font-weight-light my-3 d-none d-md-block">{DESCRIPTION}</h4>
      <h5 className="font-weight-light my-3 d-md-none">{DESCRIPTION}</h5>
      <div className="d-flex d-md-block justify-content-center mt-5">
        <SignInWithGoogleBTN variant="danger" label="Login with Google" />
      </div>
    </Container>
  </Jumbotron>
);

export default LandingPage;
