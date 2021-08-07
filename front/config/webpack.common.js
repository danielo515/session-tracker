const extensions = ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx', 'ts', 'tsx'];
const rules = [
  {
    test: /\.(ts|js)x?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
      },
    },
  },
];

module.exports = {
  extensions,
  rules,
};
