import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WatchExperience from './WatchExperience';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode><WatchExperience /></StrictMode>,
);
