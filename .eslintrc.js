/* eslint-disable no-magic-numbers */
module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
  ],
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'simple-import-sort', 'testing-library', 'simple-import-sort'],
  rules: {
    semi: ['error', 'never'],
    indent: [2, 2, { MemberExpression: 0 }],
    camelcase: 2,
    complexity: 2,
    curly: 2,
    quotes: ['error', 'single'],
    'no-magic-numbers': ['error', { enforceConst: true }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
    ],
    'array-bracket-newline': 0,
    'array-bracket-spacing': 2,
    'array-callback-return': 2,
    'array-element-newline': 0,
    'max-statements': ['error', 30],
    'max-len': ['error', 130],
    'max-lines-per-function': ['error', 170],
    'max-params': ['error', 2],
    'newline-after-var': 2,
    'newline-before-return': 2,
    'prefer-arrow-callback': 2,
    'no-shadow': 'off',
    'quote-props': [1, 'as-needed'],
    'space-in-parens': 2,
    'prefer-const': 2,
    'callback-return': 2,
    'no-empty-function': 2,
    'space-infix-ops': 2,
    'object-curly-spacing': ['error', 'always'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'keyword-spacing': [2, { before: true, after: true }],
    'space-before-blocks': 'error',
    'comma-spacing': ['error', { before: false, after: true }],
    'brace-style': 'error',
    'no-multi-spaces': 'error'
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.ts', '**/*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              // `react` first, `next` second, then packages starting with a character
              ['^react$', '^next', '^[a-z]'],
              // Packages starting with `@`
              ['^@'],
              ['^@/'],
              // Packages starting with `~`
              ['^~'],
              // Imports starting with `../`
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              // Imports starting with `./`
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
              // Style imports
              ['^.+\\.s?css$'],
              // Side effect imports
              ['^\\u0000']
            ]
          }
        ]
      }
    },
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
      rules: { 'no-magic-numbers': 'off', }
    },
    {
      files: ['**/jest.config.js', '**/tailwind.config.js'],
      rules: { '@typescript-eslint/no-var-requires': 'off' }
    }
  ],
}
