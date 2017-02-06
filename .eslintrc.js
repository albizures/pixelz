module.exports = {
  plugins: [
    'react',
    'import'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      ecmaVersion: 6,
    }
  },
  globals: {
    'Promise': true,
    '$': true,
    '$window': true,
    'it': true,
    'describe': true,
    'before': true,
    'beforeEach': true
  },
  parser: 'babel-eslint',
  rules: {
    'no-multiple-empty-lines': 'error',
    'no-cond-assign': 'error',
    'id-length': ["error", { "exceptions": ['_', '$', 'y', 'x', 'i', 'j', 'r', 'g', 'b', 'a', 'h', 's','l', 'w']}],
    'max-nested-callbacks': ["error", 3],
    'max-depth': ["error", 4],
    'max-params': ['warn', 5],
    'no-unneeded-ternary': 'error',
    'brace-style': 'error',
    'no-extra-semi': 'error',
    'max-lines': ['warn', {"max": 500, "skipBlankLines": true, "skipComments": true}],
    eqeqeq: ['error', 'always'],
    'no-undef': 'error',
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
    node: true,
    es6: true
  }
};
