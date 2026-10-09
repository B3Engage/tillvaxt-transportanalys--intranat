/* eslint-disable react/no-deprecated */
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import './components/App/Styles/App.scss?nomodules';

export default ({ initialObject }, el) => {
  ReactDOM.hydrate(
    <App initialObject={initialObject} />,
    el
  );
};
