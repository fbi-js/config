module.exports = {
  extends: ['@fbi-js/typescript', '@fbi-js/vue', '@vue/typescript'],
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': 'off'
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
        '@typescript-eslint/indent': 'off'
      }
    }
  ]
}
