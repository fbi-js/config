import { Configuration } from 'webpack'
import { ConfigFunctionParams } from '@fbi-js/webpack-config-base'

import { merge } from 'webpack-merge'
import ESLintPlugin from 'eslint-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'

export default ({ webpackConfig }: ConfigFunctionParams): Configuration => {
  const config = {
    plugins: [
      new ESLintPlugin({
        extensions: ['js', 'ts', 'jsx', 'tsx'],
        files: 'src'
      }),

      new StyleLintPlugin({
        files: 'src/**/*.{css,scss,jsx}'
      })
    ]
  }

  return merge(webpackConfig, config)
}
