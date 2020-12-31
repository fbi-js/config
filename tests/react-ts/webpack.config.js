const baseConfig = require('@fbi-js/webpack-config-base').default
const reactConfig = require('@fbi-js/webpack-config-react').default

const webpackConfig = baseConfig({
  options: {
    isTs: true
  }
})

module.exports = reactConfig({ webpackConfig })
