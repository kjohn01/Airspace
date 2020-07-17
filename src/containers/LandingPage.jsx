/* eslint-disable max-len */
import React from 'react';
import { Jumbotron, Container } from 'react-bootstrap';
import { SignInWithGoogleBTN } from '../components/components';

const LandingPage = () => (
  <Jumbotron fluid className="wallpaper">
    <Container className="mt-5 pt-5 px-5">
      <h1>Welcome to MyDrive</h1>
      <h4 className="font-weight-light my-3">
        This is a simple cloud storage web app that allows you to access your files any time any where with ease.
      </h4>
      <p>
        <SignInWithGoogleBTN variant="danger" label="Login with Google" />
      </p>
    </Container>
  </Jumbotron>
);

export default LandingPage;
