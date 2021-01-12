module.exports = {
  extends: [
    '@fbi-js',
    'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    'vue/script-indent': ['error', 2, { baseIndent: 1 }]
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
        '@typescript-eslint/indent': 'off',
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': 'off'
      }
    }
  ]
}
