/* eslint-disable */
import legacyPlugin from '@vitejs/plugin-legacy';
import * as path from 'path';
import vitePluginReactJsSupport from 'vite-plugin-react-js-support';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';

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

  let alias = {
    '@common': path.resolve(__dirname, './src/common'),
    dateUtils: path.resolve(__dirname, './src/dateUtils'),
    features: path.resolve(__dirname, './src/features'),
    formatters: path.resolve(__dirname, './src/formatters'),
    hooks: path.resolve(__dirname, './src/hooks'),
    images: path.resolve(__dirname, './src/images'),
    styles: path.resolve(__dirname, './src/styles'),
  };

  let proxy = {};

  let define = {
    'process.env.APP_IS_LOCAL': command === 'serve' ? '"true"' : '"false"',
    'process.env.REACT_APP_IS_LOCAL': command === 'serve' ? '"true"' : '"false"',
    'process.env.APP_VERSION': "'1.0.0'",
  };

  let esbuild = {};

  /**
   *  * @type {import('vite').UserConfig}
   */
  return {
    base: './',
    root: './',
    resolve: {
      alias,
    },
    define: define,
    server: {
      // 代理
      proxy,
    },
    build: {
      target: 'es2015',
      minify: 'terser', // 是否进行压缩,boolean | 'terser' | 'esbuild',默认使用terser
      manifest: false, // 是否产出maifest.json
      sourcemap: false, // 是否产出soucemap.json
      outDir: 'build', // 产出目录
      rollupOptions,
    },
    esbuild,
    optimizeDeps,
    plugins: [
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
      vitePluginReactJsSupport([], {
        jsxInject: false,
      }),
      react(),
    ],
    css: {
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true,
        },
      },
    },
  };
};
