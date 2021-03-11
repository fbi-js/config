import fs from 'fs'
import path from 'path'
import webpack from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import ProgressWebpackPlugin from '../progress-webpack-plugin'
import { isProd } from '../utils'

export const getWebpackPlugins = (options: any) => {
  const isDev = !isProd()
  const htmlWebpackPluginTemplatePath = path.join(
    options.paths.public,
    'index.html'
  )
  const hasTemplateFile = fs.existsSync(htmlWebpackPluginTemplatePath)
  const hasPublicFolder = fs.existsSync(options.paths.public)

  const plugins: any[] = [
    // use prefetchPlugin to improve the incremental build times
    new webpack.AutomaticPrefetchPlugin(),
    // Make appName & appVersion available as a constant
    new webpack.DefinePlugin(options.definePluginData),
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),
    // add eslint plugin
    new ESLintPlugin(options.eslint),
    // add stylelint plugin
    new StyleLintPlugin(options.stylelint)
  ]

  if (isDev) {
    // add hmr
    plugins.push(new webpack.HotModuleReplacementPlugin())
    // add process plugin
    plugins.push(
      new ProgressWebpackPlugin({
        format: 'minimal',
        color: 'white',
        ...options.progress
      })
    )
  } else {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: `${options.paths.css}/[name].[contenthash].css`
      })
    )
  }

  // Copies files from target to destination folder
  if (hasPublicFolder) {
    plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: options.paths.public,
            globOptions: {
              dot: true
            },
            filter: (resourcePath) => !resourcePath.endsWith('index.html')
          }
        ]
      })
    )
  }

  if (hasTemplateFile) {
    plugins.push(
      new HtmlWebpackPlugin({
        title: options.title ?? 'My App',
        template: htmlWebpackPluginTemplatePath,
        filename: 'index.html', // output file
        // https://github.com/jantimon/html-webpack-plugin/blob/657bc605a5dbdbbdb4f8154bd5360492c5687fc9/examples/template-parameters/webpack.config.js#L20
        templateParameters: (
          compilation: { options: any },
          assets: any,
          assetTags: any,
          options: any
        ) => {
          return {
            compilation,
            webpackConfig: compilation.options,
            htmlWebpackPlugin: {
              tags: assetTags,
              files: assets,
              options
            },
            isLocal: isDev,
            serverUrl: `http://localhost:${options.port as string}`
          }
        }
      })
    )
  }

  return plugins
}
