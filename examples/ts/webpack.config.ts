import config from '@fbi-js/webpack-config-base'

const webpackConfig = {
  ...config({
    options: {
      isTs: true
    }
  }),
  entry: './src/index.ts'
}

export default webpackConfig
