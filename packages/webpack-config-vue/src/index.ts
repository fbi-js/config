import { Configuration } from 'webpack'
import webpackConfigBase, {
  webpackMerge,
  resolveOptions,
  ConfigFunctionParams
} from '@fbi-js/webpack-config-base'

import { resolve } from 'path'
import { VueLoaderPlugin } from 'vue-loader'
import getOptions from './options'

export default ({
  webpackConfig,
  options: userOptions
}: ConfigFunctionParams = {}): Configuration => {
  const vueOptions = getOptions(userOptions)
  const options = resolveOptions(vueOptions)

  const config = webpackMerge.mergeWithRules(options.mergeRules)(
    {
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
    },
    webpackConfig ?? {}
  )

  return webpackConfigBase({
    options,
    webpackConfig: config
  })
}
