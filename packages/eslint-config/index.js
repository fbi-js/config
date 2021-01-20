module.exports = {
  // https://eslint.org/docs/user-guide/configuring#using-configuration-files-1
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['standard', 'plugin:prettier/recommended', 'prettier/standard'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: '2020',
    sourceType: 'module'
  }
}
