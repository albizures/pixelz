module.exports = {
  plugins: [
    'react'
  ],
  parserOptions: {
    ecmaFeatures: {
      'jsx': true
    }
  },
  parser: 'babel-eslint',
  rules: {
    eqeqeq: ['error', 'always'],
    strict: ['error', 'global'],
    'no-unused-vars': ['error', {
      vars: 'all',
      args: 'after-used',
      varsIgnorePattern: 'React'
    }],
    'space-infix-ops': ['error', {
      int32Hint: false
    }],
    'key-spacing': ['error', {
      afterColon: true
    }],
    'keyword-spacing': ['error', {
      before: true
    }],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    semi: 2,
    'indent': ['error', 2, {
      SwitchCase: 1
    }],
    'no-continue': 0,
    'require-jsdoc': [
      2, {
        require: {
          FunctionDeclaration: false,
          MethodDefinition: false
        }
      }
    ]
  },
  env: {
    browser: true,
    node: true
  }
};