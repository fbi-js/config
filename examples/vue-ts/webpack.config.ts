import config from '@fbi-js/webpack-config-vue'
import webpack from 'webpack'
// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin()

const webpackConfig = config({
  options: {
    isTs: true,
    progress: {
      format: 'minimal',
      color: 'cyan'
    }
  },
  webpackConfig: {
    cache: {
      type: 'filesystem'
    },
    plugins: [
      new webpack.AutomaticPrefetchPlugin()
    ]
  }
})

// const newWebpackConfig = JSON.parse(JSON.stringify(webpackConfig))
// console.log(newWebpackConfig)

export default webpackConfig
