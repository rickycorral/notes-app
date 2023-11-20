import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root'); // Ensure you have a 'root' element in your HTML.
const root = createRoot(rootElement);
root.render(<App />);
