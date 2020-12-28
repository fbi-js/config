module.exports = {
  extends: ['@fbi-js', 'standard-with-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/indent': [
      'error',
      2,
      {
        ignoredNodes: ['TemplateLiteral *', 'VariableDeclaration *'],
      },
    ],
  },
}
