import { PartialOptions } from '@fbi-js/webpack-config-base'

export default (options: PartialOptions = {}): PartialOptions => ({
  ...options,
  eslint: {
    extensions: ['js', 'ts', 'jsx', 'tsx', 'vue'],
    files: 'src',
    baseConfig: {
      extends: [options?.isTs ? '@fbi-js/vue-typescript' : '@fbi-js/vue']
    },
    ...options.eslint
  },
  stylelint: {
    files: 'src/**/*.{css,scss,vue}',
    allowEmptyInput: true,
    ...options.stylelint
  }
})
