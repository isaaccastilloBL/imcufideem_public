import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { warmupBackend } from './services/api';
import './index.css';

// Pre-calentamos el Lambda del backend ANTES de renderizar para que cuando
// el ciudadano termine de escribir su matrícula el backend ya esté despierto.
// Es best-effort — si falla no rompe nada.
warmupBackend();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
