/* eslint-disable */
import legacyPlugin from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
import pkg from './package.json';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

// @see https://cn.vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  let define = {
    'process.env.APP_IS_LOCAL': command === 'serve' ? '"true"' : '"false"',
    'process.env.REACT_APP_IS_LOCAL': command === 'serve' ? '"true"' : '"false"',
    'process.env.APP_VERSION': JSON.stringify(pkg.version),
  };

  /**
   *  * @type {import('vite').UserConfig}
   */
  return {
    base: '/',
    root: './',
    define,
    logLevel: 'info',
    build: {
      target: 'es2015',
      minify: 'esbuild',
      manifest: false,
      sourcemap: 'inline',
      outDir: 'build',
    },
    optimizeDeps: {
      include: [
        '@material-ui/core',
        '@material-ui/icons',
        '@material-ui/styles',
        'react-dom',
        'react',
      ],
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
