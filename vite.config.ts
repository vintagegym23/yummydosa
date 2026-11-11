import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {seoBuildSettings} from './scripts/seo-settings.mjs';

export default defineConfig(({isSsrBuild}) => {
  // Canonical domain + whether this build may be indexed (preview branches are not).
  const seo = seoBuildSettings();

  return {
    plugins: [react(), tailwindcss()],
    define: {
      __SITE_URL__: JSON.stringify(seo.siteUrl),
      __SEO_NOINDEX__: JSON.stringify(seo.noindex),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Production builds ship without source maps (keeps source private, smaller deploy).
      sourcemap: false,
      // Lets scripts/prerender.mjs add <link rel="modulepreload"> for each page's own chunk
      // (the prerender step deletes the manifest from dist/ afterwards).
      manifest: !isSsrBuild,
      rollupOptions: isSsrBuild ? {} : {
        output: {
          // Third-party code changes rarely, so it gets its own long-cached chunks:
          // a content-only deploy then only invalidates the small app chunks.
          manualChunks: {
            react: ['react', 'react-dom', 'react-dom/client', 'react-router-dom'],
            motion: ['motion/react'],
          },
        },
      },
    },
  };
});
