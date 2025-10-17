module.exports = {
  root: true,
  extends: '@react-native',
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    // Meta/Facebook style rules adapted from fbjs-opensource
    'comma-dangle': ['error', 'always-multiline'],
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'object-curly-spacing': ['error', 'never'],
    'array-bracket-spacing': ['error', 'never'],
    'computed-property-spacing': ['error', 'never'],
    'no-trailing-spaces': 'error',
    'eol-last': 'error',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single', {avoidEscape: true}],
    'jsx-quotes': ['error', 'prefer-double'],
    'no-multi-spaces': 'error',
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'brace-style': ['error', '1tbs', {allowSingleLine: true}],
    'keyword-spacing': 'error',
    'space-before-blocks': 'error',
    'space-before-function-paren': ['error', 'never'],
    'consistent-return': 'error',
    'no-undef': 'error',
    'no-use-before-define': ['error', {functions: false}],
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
      plugins: ['@typescript-eslint'],
      extends: [
        '@react-native',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        // Disable base rules that are covered by TypeScript versions
        'no-unused-vars': 'off',
        'no-undef': 'off',
        'no-use-before-define': 'off',
      },
    },
  ],
};
