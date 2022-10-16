module.exports = {
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  extends: [
    'plugin:@typescript-eslint/recommended'
  ],
  rules: {
    'no-use-before-define': 'off',
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'object-curly-spacing': ['error', 'always'],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
    ],
    'no-multiple-empty-lines': ['error', { 'max': 1 }],
    'space-in-parens': ['error', 'never'],
    'space-before-function-paren': 'off',
    'keyword-spacing': ['error', { before: true, after: true }],
    'comma-dangle': ['error', 'never'],
    'function-paren-newline': 'off',
    '@typescript-eslint/prefer-as-const': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_.*$',
        varsIgnorePattern: '^_.*$'
      }
    ]
  },
  ignorePatterns: [ 'pages/public/*' ]
}
