import { Configuration } from 'webpack'
import { ConfigFunctionParams } from '@fbi-js/webpack-config-base'

import { resolve } from 'path'
import { merge } from 'webpack-merge'
import { VueLoaderPlugin } from 'vue-loader'
import ESLintPlugin from 'eslint-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'

export default ({ webpackConfig }: ConfigFunctionParams): Configuration => {
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
    plugins: [
      new ESLintPlugin({
        extensions: ['js', 'ts', 'jsx', 'tsx', 'vue'],
        files: 'src'
        // fix: true
      } as any),

      new StyleLintPlugin({
        files: 'src/**/*.{css,scss,vue}'
      }),

      new VueLoaderPlugin()
    ],
    resolve: {
      extensions: ['.vue'],
      alias: {
        vue: 'vue/dist/vue.esm.js'
      }
    }
  }

  return merge(webpackConfig, config as Configuration)
}
