module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['@fbi-js', 'plugin:@typescript-eslint/eslint-recommended'],
  parserOptions: {
    project: './tsconfig.json'
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      },
      // See: https://www.npmjs.com/package/eslint-import-resolver-typescript
      typescript: {}
    }
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-use-before-define': 'off',
        'import/no-duplicates': 'off'
      }
    },
    {
      files: ['*.d.ts'],
      rules: {
        // The core 'no-unused-vars' rules (in the eslint:recommeded ruleset)
        // does not work with type definitions
        'no-unused-vars': 'off'
      }
    }
  ]
}
