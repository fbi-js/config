module.exports = {
  extends: [
    '@fbi-js/eslint-config-typescript',
    '@fbi-js/eslint-config-vue',
    '@vue/typescript',
  ],
  // parserOptions: {
  //   project: './tsconfig.json',
  // },
  // plugins: ['vue'],
  // parser: 'vue-eslint-parser',
  // parserOptions: {},
  // extends: [
  //   // add more generic rulesets here, such as:
  //   // 'eslint:recommended',
  //   // 'plugin:vue/vue3-recommended',
  //   'plugin:vue/recommended', // Use this if you are using Vue.js 2.x.
  // ],
  // rules: {
  //   'vue/script-indent': ['error', 4, { baseIndent: 1 }],
  // },
  rules: {
    'vue/script-indent': ['error', 2, { baseIndent: 1 }],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        indent: 'off',
        '@typescript-eslint/indent': 'off',
      },
    },
  ],
}
