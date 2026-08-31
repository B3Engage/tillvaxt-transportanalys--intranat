import * as React from 'react';
import { hydrateRoot } from 'react-dom/client';
import App from './components/App/App.js';
import './components/App/Styles/App.scss?nomodules';

export default ({ initialObject }, el) => {
  hydrateRoot(
    el,
    <App initialObject={initialObject} />
  );
};
