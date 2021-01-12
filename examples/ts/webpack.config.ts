import config from '@fbi-js/webpack-config-base'

export default () => ({
  ...config({
    options: {
      isTs: true
    }
  }),
  entry: './src/index.ts'
})
