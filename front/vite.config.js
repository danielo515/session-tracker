/* eslint-disable */
import legacyPlugin from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
import pkg from './package.json';
import tsconfigPaths from 'vite-tsconfig-paths';

// @see https://cn.vitejs.dev/config/
export default ({ command, mode }) => {
  let rollupOptions = {};
  if (command === 'serve') {
    rollupOptions.input = [];
  }

  let optimizeDeps = {};
  if (command === 'serve') {
    optimizeDeps.entries = false;
  }

  let proxy = {};

  let define = {
    'process.env.APP_IS_LOCAL': command === 'serve' ? '"true"' : '"false"',
    'process.env.REACT_APP_IS_LOCAL': command === 'serve' ? '"true"' : '"false"',
    'process.env.APP_VERSION': JSON.stringify(pkg.version),
  };

  let esbuild = {};

  /**
   *  * @type {import('vite').UserConfig}
   */
  return {
    base: './',
    root: './',
    define: define,
    server: {
      proxy,
    },
    build: {
      target: 'es2015',
      minify: 'terser',
      manifest: false,
      sourcemap: false,
      outDir: 'build',
      rollupOptions,
    },
    esbuild,
    optimizeDeps,
    plugins: [
      tsconfigPaths(),
      envCompatible({
        prefix: 'REACT_APP_',
      }),
      legacyPlugin({
        targets: [
          'Android > 39',
          'Chrome >= 60',
          'Safari >= 10.1',
          'iOS >= 10.3',
          'Firefox >= 54',
          'Edge >= 15',
        ],
      }),
      react(),
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
      },
    },
  };
};
