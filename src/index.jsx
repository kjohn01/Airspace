/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable max-len */
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import { GlobalAuthState } from './components/components';
import * as serviceWorker from './scripts/serviceWorker';

// ReactDOM.render(<GlobalAuthState className="App"><App /></GlobalAuthState>, document.getElementById('root'));

// Enable React concurrent mode
ReactDOM.unstable_createRoot(document.getElementById('root')).render(<GlobalAuthState className="App"><App /></GlobalAuthState>);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
