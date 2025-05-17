import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initTelegramApp } from './telegram';
import reportWebVitals from './reportWebVitals';

// Инициализация Telegram WebApp
initTelegramApp();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();