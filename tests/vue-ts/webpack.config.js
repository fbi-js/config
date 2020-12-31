const { resolveConfig } = require('@fbi-js/webpack-config-base')
const webpackVueConfig = require('@fbi-js/webpack-config-vue').default

const webpackConfig = resolveConfig({
  options: {
    isTs: true
  }
})

const vueConfig = webpackVueConfig({ webpackConfig })
console.log(vueConfig.module)
module.exports = vueConfig
