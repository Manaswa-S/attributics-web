if (import.meta.env.PROD) {
  console.warn = () => {};
  console.clear();
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import './styles/fonts.css';
import './styles/blog.css';
import './styles/background.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
