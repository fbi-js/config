import { ConfigFunctionParams } from './types'

import fs from 'fs'
import { join, resolve } from 'path'
import webpack, { Configuration } from 'webpack'
import WebpackBar from 'webpackbar'
import * as webpackMerge from 'webpack-merge'
import ESLintPlugin from 'eslint-webpack-plugin'
import StyleLintPlugin from 'stylelint-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import { isProd, getEnvMode } from './utils'
import { defaults as defaultOptions, resolveOptions } from './options'

export * from './types'
export * from './utils'

export { webpackMerge, resolveOptions, defaultOptions }

export default ({
  options: userOptions,
  webpackConfig
}: ConfigFunctionParams = {}): Configuration => {
  const options = resolveOptions(userOptions)
  const isDev = !isProd()
  const htmlWebpackPluginTemplatePath = join(options.paths.public, 'index.html')
  const hasTemplateFile = fs.existsSync(htmlWebpackPluginTemplatePath)
  const hasPublicFolder = fs.existsSync(options.paths.public)

  if (options.isTs) {
    options.babel?.presets.push('@babel/preset-typescript')
  }

  const baseCssLoaders: any[] = [
    {
      loader: 'css-loader',
      options: options.css
    },
    {
      loader: 'postcss-loader',
      options: options.postcss
    }
  ]

  if (isDev) {
    baseCssLoaders.unshift('style-loader', '@opd/css-modules-typings-loader')
  } else {
    baseCssLoaders.unshift({
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: options.paths.cssExtractPublicPath
      }
    })
  }

  const config = {
    mode: getEnvMode(),
    devtool: isDev ? 'eval-cheap-module-source-map' : false,
    entry: {
      main: join(options.paths.src, `main.${options.isTs ? 'ts' : 'js'}`)
    },
    output: {
      path: options.paths.dist,
      publicPath: process.env.ASSET_PATH ?? '/',
      filename: isDev
        ? '[name].js?v=[fullhash]'
        : `${options.paths.js}/[name].[fullhash].js`,
      assetModuleFilename: isDev
        ? '[name].[hash][ext][query]'
        : `${options.paths.assets}/[name].[hash][ext][query]`
    },
    cache: {
      type: 'filesystem'
    },
    module: {
      rules: [
        {
          test: /\.(j|t)sx?$/,
          exclude: resolve('node_modules'),
          use: {
            loader: 'babel-loader',
            options: options.babel
          }
        },
        {
          test: /\.(sc|sa|c)ss$/,
          use: [
            ...baseCssLoaders,
            {
              loader: 'sass-loader',
              options: options.sass
            }
          ]
        },
        {
          test: /\.less$/,
          use: [
            ...baseCssLoaders,
            {
              loader: 'less-loader',
              options: options.less
            }
          ]
        },
        {
          test: /\.(png|jpe?g|gif)(\?.*)?$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024 // 4kb
            }
          },
          generator: {
            filename: isDev
              ? '[name][ext][query]'
              : `${options.paths.img}/[name].[hash][ext][query]`
          }
        },
        // https://github.com/gregberge/svgr/issues/396#issuecomment-714866066
        // {
        //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        //   issuer: /\.(j|t)sx?$/,
        //   use: ['@svgr/webpack']
        // },
        // {
        //   test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        //   issuer: /\.(sc|sa|c|le)ss$/,
        //   loader: 'url-loader'
        // },
        {
          test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
          issuer: /\.(sc|sa|c|le)ss$/,
          type: 'asset/resource'
        },
        {
          test: /\.(mp4|mov|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          type: 'asset/resource'
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          type: 'asset/resource'
        }
      ]
    },
    plugins: [
      new WebpackBar({
        name: options.title ?? 'project',
        color: '#0052D9'
      }),
      // Make appName & appVersion available as a constant
      new webpack.DefinePlugin(options.definePluginData),
      // Removes/cleans build folders and unused assets when rebuilding
      !isDev && new CleanWebpackPlugin(),
      // Copies files from target to destination folder
      hasPublicFolder
        ? new CopyWebpackPlugin({
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
        : null,
      hasTemplateFile
        ? new HtmlWebpackPlugin({
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
        : null,
      new ESLintPlugin(options.eslint),
      new StyleLintPlugin(options.stylelint),
      isDev
        ? new webpack.HotModuleReplacementPlugin()
        : new MiniCssExtractPlugin({
            filename: `${options.paths.css}/[name].[contenthash].css`
          })
    ].filter(Boolean),
    resolve: {
      extensions: ['.js', '.ts', '.jsx', '.tsx', '.mjs', '.wasm', '.json'],
      modules: [
        'node_modules',
        join(__dirname, '../node_modules'),
        // TODO: remove
        join(__dirname, '../../../node_modules')
      ],
      alias: {
        '@': resolve('src/')
      }
    },
    resolveLoader: {
      modules: [
        'node_modules',
        join(__dirname, '../node_modules'),
        // TODO: remove
        join(__dirname, '../../../node_modules')
      ]
    },
    stats: options.stats,
    ...(isDev
      ? {
          devServer: options.devServer
        }
      : {
          optimization: options.optimization,
          performance: options.performance
        })
  }

  return webpackMerge.mergeWithRules(options.mergeRules)(
    config,
    webpackConfig ?? {}
  )
}
