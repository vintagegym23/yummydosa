import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import {ErrorBoundary} from './components/ErrorBoundary';
import './index.css';

// After a new deploy, an open tab may request page chunks from the previous build that no
// longer exist. Reload once to pick up the new build (guarded so it can't loop).
window.addEventListener('vite:preloadError', (event) => {
  const key = 'yd-chunk-reload';
  if (sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key, '1');
  event.preventDefault();
  window.location.reload();
});
window.addEventListener('load', () => sessionStorage.removeItem('yd-chunk-reload'));

const app = (
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>
);

const container = document.getElementById('root')!;
// Production pages are prerendered (scripts/prerender.mjs): attach to that HTML instead of
// re-rendering it. The dev server serves an empty root, so render from scratch there.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
