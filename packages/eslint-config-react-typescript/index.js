module.exports = {
  extends: ['@fbi-js/react', '@fbi-js/typescript'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      },
      'import/extensions': ['.js', '.ts', '.mjs', '.jsx', '.tsx']
    }
  }
}
