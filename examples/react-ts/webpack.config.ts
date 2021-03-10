import config from '@fbi-js/webpack-config-react'

const webpackConfig = config({
  options: {
    presets: ['react', 'typescript']
  }
})

export default webpackConfig
