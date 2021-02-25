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
          },
          {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            issuer: /\.vue$/,
            // https://vue-svg-loader.js.org/faq.html#how-to-use-both-inline-and-external-svgs
            oneOf: [
              {
                resourceQuery: /inline/,
                use: [
                  {
                    // https://github.com/webpack-contrib/url-loader#options
                    loader: 'url-loader',
                    options: {
                      limit: 4 * 1024 // 4kb
                    }
                  }
                ]
              },
              {
                use: ['vue-loader', 'vue-svg-loader']
              }
            ]
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
  }) as Configuration
}
