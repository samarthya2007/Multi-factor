
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
const bootLoader = document.getElementById('boot-loader');

if (!rootElement) {
  console.error("CRITICAL ERROR: Root element missing. Security protocol halted.");
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Dismiss kernel boot loader once React mounts
  window.addEventListener('load', () => {
    if (bootLoader) {
      setTimeout(() => {
        bootLoader.style.opacity = '0';
        setTimeout(() => bootLoader.remove(), 500);
      }, 800);
    }
  });
}
