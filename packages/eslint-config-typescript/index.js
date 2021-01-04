module.exports = {
  extends: ['@fbi-js', 'standard-with-typescript'],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    // TODO
    // '@typescript-eslint/indent': [
    //   'error',
    //   2,
    //   {
    //     SwitchCase: 2,
    //     ignoredNodes: ['TemplateLiteral *', 'VariableDeclaration *']
    //   }
    // ],
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
