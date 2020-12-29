module.exports = {
  extends: [
    '@fbi-js',
    'plugin:vue/recommended', // Use this if you are using Vue.js 2.x.
  ],

  // plugins: ['vue'],
  // parserOptions: {},
  // rules: {
  //   'vue/script-indent': ['error', 4, { baseIndent: 1 }],
  // },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/singleline-html-element-content-newline': 'off',
        'vue/html-self-closing': 'off',
      },
    },
  ],
}
