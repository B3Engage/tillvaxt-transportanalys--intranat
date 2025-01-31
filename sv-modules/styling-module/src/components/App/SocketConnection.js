/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import io from 'socket.io-client';

import toasts from '@sitevision/api/client/toasts';

const localHostedCSSPath = 'http://localhost:3000/main.css';

const showMessage = (message, type) => {
  toasts.publish({
     heading: 'Dev-mode:',
     message,
     type,
  });
};

const updateLink = () => {
  const stylesheet = document.querySelector(`link[href^="${localHostedCSSPath}"]`);
  if (stylesheet)
    stylesheet.href = `${localHostedCSSPath}?${new Date().getTime()}`;
  else {
    let css = document.createElement('link')
    css.href = `${localHostedCSSPath}?${new Date().getTime()}`
    css.rel = 'stylesheet'
    document.head.appendChild(css);
  }
}

const SocketConnection = ({ setDevMode }) => {

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socket.on('connect', () => {
      console.log('Connected to server');
      showMessage('active', 'success')
      updateLink();
    });
    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      showMessage('deactivated', 'dark')
      updateLink();
    });
    socket.on('css-update', () => {
      console.log('Reloading CSS file');
      updateLink();
    });
    socket.on('connect_error', (err) => {
      if (err.type === 'TransportError') {
        console.log('Dev-server ej aktiv, stänger ner socket...');
        showMessage('Dev-server ej aktiv, stänger av dev-läget...', 'danger')
        setDevMode(false);
      } 
      else console.log('Något gick fel här, stänger ner socket...')
      socket.disconnect();
    })
    return () => {
      socket.disconnect();
      console.log('closing socketio component')
      document.querySelector(`link[href^="${localHostedCSSPath}"]`).remove();
    };
  }, []);
  return null
}

export default SocketConnection