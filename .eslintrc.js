module.exports = {
  extends: [
    'eslint:recommended', 
    'plugin:react/recommended'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  rules: {
    'no-console': 'off',
    'no-undef': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
  }
};
