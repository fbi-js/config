import { Configuration } from 'webpack'
import webpackConfigBase, {
  merge,
  ConfigFunctionParams
} from '@fbi-js/webpack-config-base'

import { resolve } from 'path'
import { VueLoaderPlugin } from 'vue-loader'
import resolveOptions from './options'

export default ({
  webpackConfig,
  options
}: ConfigFunctionParams = {}): Configuration => {
  const baseConfig = webpackConfigBase({
    options: resolveOptions(options)
  })

  const config = {
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: resolve('node_modules'),
          loader: 'vue-loader',
          options: {
            shadowMode: true
          }
        }
      ]
    },
    plugins: [new VueLoaderPlugin()],
    resolve: {
      extensions: ['.vue'],
      alias: {
        vue: 'vue/dist/vue.esm.js'
      }
    }
  }

  return merge(baseConfig, webpackConfig || {}, config as any)
}
