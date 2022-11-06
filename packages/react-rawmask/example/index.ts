import { createElement } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './App';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('#root');

  if (!container) {
    return;
  }

  const root = createRoot(container);

  root.render(createElement(App));
});
