/* eslint-disable max-len */
import React from 'react';
import './styles/App.scss';
import { NavBar, GlobalAuthState } from './components/components';
import Dashboard from './containers/Dashboard';

const App = () => (
  <GlobalAuthState className="App">
    <NavBar />
    <Dashboard />
  </GlobalAuthState>
);
export default App;
