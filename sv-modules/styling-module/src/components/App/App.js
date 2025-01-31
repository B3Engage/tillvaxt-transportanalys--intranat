/* eslint-disable react/prop-types */
import React from 'react';

import DevMode from './DevMode';

const App = ({ initialObject }) => {

  const { isDeveloper, isInEditMode } = initialObject;

  return <>
    {isDeveloper ?
        <DevMode initialObject={initialObject} isInEditMode={isInEditMode} />
      : ''
    }
  </>
};

export default App;
