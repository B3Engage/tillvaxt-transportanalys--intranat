import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App.js';
import './components/App/Styles/App.scss?nomodules';

export default (initialState, el) => {
  ReactDOM.hydrate(
    <App initialObject={initialState.initialObject} />,
    el
  );
};
