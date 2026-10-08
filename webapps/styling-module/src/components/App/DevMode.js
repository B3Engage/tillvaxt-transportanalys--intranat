/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'

import SocketConnection from './SocketConnection';

import toggleOff from '../../../assets/toggleOff.svg';
import toggleOn from '../../../assets/toggleOn.svg';

const localHostedCSSPath = 'http://localhost:3000/dist/main.css';

const DevMode = ({ initialObject }) => {
  const [devMode, setDevMode] = useState('unset');
  const [mainStylingLink, setMainStylingLink] = useState(false);

  const { id } = initialObject;

  const handleToggle = () => setDevMode(!devMode);

  const updateHref = () => {
    if (devMode) {
      let currentLink = document.querySelector(`link[href*='/webapp-resource/${id}']`);
      if (currentLink) {
        setMainStylingLink(currentLink.href);
        currentLink.href = localHostedCSSPath;
      }
    } else {
      let currentLink = document.querySelector(`link[href^='${localHostedCSSPath}']`);
      if (currentLink)
        currentLink.href = mainStylingLink;
    }
  }

  const setCookies = () => {
    if (devMode === 'unset') {
      let cookieValue = document.cookie
        .split('; ')
        .find((row) => row.startsWith('devmode='))
        ?.split('=')[1];
      if (cookieValue) setDevMode(cookieValue === 'true');
      else setDevMode(false);
    } else {
      document.cookie = `devmode=${devMode}`;
    }
  }

  useEffect(() => {
    updateHref();
    setCookies();
  }, [devMode])

  return (
    <div>
      {devMode && <SocketConnection setDevMode={setDevMode} />}
      <button
        onClick={handleToggle}
        aria-label="toggle dev mode"
        className="dev-mode-toggle"
      >
        <img
          src={devMode ? toggleOn : toggleOff}
          alt="dev toggle"
          className="dev-mode-toggle__image"
        />
      </button>
    </div>
  )
}

export default DevMode