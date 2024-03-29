import React from 'react';
import AppRouter from './App';
import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
if (domNode) {
  const root = createRoot(domNode);
  
  root.render(
    <React.StrictMode>
      <AppRouter />
    </React.StrictMode>
  );
}
