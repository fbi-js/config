import config from '@fbi-js/webpack-config-vue'

const webpackConfig = config({
  options: {
    presets: ['vue', 'typescript']
  }
})

export default webpackConfig
