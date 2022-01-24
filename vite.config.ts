import fs from 'fs';
import analyzer from 'rollup-plugin-analyzer';
import visualizer from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
// import legacyPlugin from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
import pkg from './package.json';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig, Plugin } from 'vite';
import Manifest from './public/manifest.json';

// @see https://cn.vitejs.dev/config/
export default defineConfig(({ command }) => {
  const define = {
    'process.env.APP_IS_LOCAL': command === 'serve' ? '"true"' : '"false"',
    'process.env.REACT_APP_IS_LOCAL': command === 'serve' ? '"true"' : '"false"',
    'process.env.APP_VERSION': JSON.stringify(pkg.version),
  };

  return {
    base: '/',
    root: './',
    define,
    logLevel: 'warn',

    build: {
      target: 'es2015',
      minify: 'esbuild',
      manifest: false,
      sourcemap: 'inline',
      outDir: 'build',

      rollupOptions: {
        output: {
          manualChunks: { '@firebase-auth': ['@firebase/auth'] },
        },
        plugins: [
          visualizer({
            open: true,
            template: 'treemap',
          }),
          analyzer({
            showExports: false,
            limit: 10,
            summaryOnly: true,
            writeTo(analysis: string) {
              fs.writeFileSync('./stats-comment.html', `<pre><code>${analysis}</code></pre>`);
            },
          }) as Plugin,
        ],
      },
    },
    preview: {
      open: true,
    },
    plugins: [
      tsconfigPaths(),
      envCompatible({
        prefix: 'REACT_APP_',
      }),
      // legacyPlugin({
      //   targets: ['defaults', 'not IE 11'],
      // }),
      react(),
      VitePWA({
        strategies: 'generateSW',
        registerType: 'autoUpdate',
        manifest: Manifest,
        workbox: {
          maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };
});
