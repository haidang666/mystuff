module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  parser: '@babel/eslint-parser',
  plugins: ['@babel'],
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    requireConfigFile: false,
    babelOptions: {
      plugins: ['@babel/plugin-proposal-class-properties']
    }
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  rules: {
    'react/display-name': 'off',
    'react/prop-types': 'off',

    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],

    'no-undef': 'off',

    // Best practice
    eqeqeq: 'warn',
    curly: 'error',
    'dot-location': ['error', 'property'],
    'dot-notation': 'error',
    'no-alert': 'warn',
    'object-shorthand': ['error', 'always'],
    'no-console': ['error', { allow: ['warn', 'error'] }],

    // Style
    'array-bracket-spacing': 'error',
    'object-curly-spacing': 'off',
    'brace-style': 'error',
    'comma-dangle': ['error', 'only-multiline'],
    'comma-spacing': 'error',
    'comma-style': 'error',
    'eol-last': 'error',
    'key-spacing': 'error',
    'keyword-spacing': 'error',
    'no-lonely-if': 'error',
    'no-multiple-empty-lines': 'error',
    'no-tabs': 'error',
    'semi-style': ['error', 'last'],
    'spaced-comment': ['error', 'always'],

    // ES 6
    'arrow-spacing': 'error',
    'no-var': 'error'
  }
};
