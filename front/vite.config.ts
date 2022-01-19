import { visualizer } from 'rollup-plugin-visualizer';
import { VitePWA } from 'vite-plugin-pwa';
// import legacyPlugin from '@vitejs/plugin-legacy';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';
import pkg from './package.json';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';

// @see https://cn.vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const define = {
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
      rollupOptions: {
        plugins: [
          visualizer({
            open: false,
            template: 'treemap',
          }),
        ],
      },
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
      VitePWA(),
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
