module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  plugins: [
    'eslint-plugin-prefer-arrow-functions',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'consistent-return': [
      'error',
      {
        treatUndefinedAsUnspecified: true,
      },
    ],
    'no-void': 'off',
    'no-nested-ternary': 'off',
    indent: [
      'error',
      2,
      {
        flatTernaryExpressions: true,
      },
    ],
    'object-curly-newline': [
      'error',
      {
        ObjectExpression: {
          multiline: true,
          consistent: true,
        },
        ObjectPattern: {
          multiline: true,
          consistent: true,
        },
        ImportDeclaration: {
          multiline: true,
          consistent: true,
        },
        ExportDeclaration: {
          multiline: true,
          consistent: true,
        },
      },
    ],
    'prefer-arrow-functions/prefer-arrow-functions': [
      'error',
      {
        classPropertiesAllowed: false,
        disallowPrototype: false,
        returnStyle: 'unchanged',
        singleReturnOnly: false,
      },
    ],
    'no-unused-vars': [ 2, { args: 'after-used', argsIgnorePattern: '^_', } ],
  },
  overrides: [
    { files: [ '**/*.test.js' ],
      env: { jest: true },
    },
  ],
};

