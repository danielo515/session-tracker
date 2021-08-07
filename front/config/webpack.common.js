const eslintFormatter = require('react-dev-utils/eslintFormatter');
const paths = require('./paths');
const extensions = ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', 'ts', 'tsx'];
const rules = [
  // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
  {
    test: /\.(tsx|ts|js)$/,
    loader: 'ts-loader',

    include: paths.appSrc,
  },
];

module.exports = {
  extensions,
  rules,
};
