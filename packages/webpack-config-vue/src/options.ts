import { Options } from '@fbi-js/webpack-config-base'

export default (options: Partial<Options> = {}): Partial<Options> => ({
  eslint: {
    extensions: ['js', 'ts', 'jsx', 'tsx', 'vue'],
    files: 'src',
    baseConfig: {
      extends: [options?.isTs ? '@fbi-js/vue-typescript' : '@fbi-js/vue']
    }
  },
  stylelint: {
    files: 'src/**/*.{css,scss,vue}',
    configFile: require.resolve('@fbi-js/stylelint-config'),
    allowEmptyInput: true
  },
  ...options
})
