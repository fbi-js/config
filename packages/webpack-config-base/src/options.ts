import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

import { resolve } from 'path'
import { Options } from './types'
import { isProd } from './utils'

const cwd = process.cwd()
const PORT = 9000
const HOST = '0.0.0.0'

export default (options: Partial<Options> = {}): Options => {
  const isDev = !isProd()

  return {
    paths: {
      cwd,
      // Source files
      src: resolve(cwd, 'src'),

      // Production build files
      dist: resolve(cwd, 'dist'),

      // Static files that get copied to build folder
      public: resolve(cwd, 'public'),

      js: 'js',
      css: 'css',
      cssExtractPublicPath: '../',
      img: 'img',
      assets: 'assets'
    },
    definePluginData: {},
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    optimization: {
      minimize: true,
      minimizer: ['...', new CssMinimizerPlugin()],
      // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
      // instead of having their own. This also helps with long-term caching, since the chunks will only
      // change when actual code changes, not the webpack runtime.
      runtimeChunk: {
        name: 'runtime'
      },
      chunkIds: 'named'
    },
    stats: isDev
      ? {
          all: false,
          colors: true,
          errors: true
        }
      : {
          all: false,
          colors: true,
          errors: true,
          timings: true,
          assetsSort: '!size',
          assets: true,
          excludeAssets: [/\.*\.map/]
        },
    devServer: {
      historyApiFallback: true,
      compress: true,
      open: false,
      overlay: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*'
      },
      // host: HOST,
      port: PORT,
      // https://github.com/webpack/webpack-dev-server/releases/tag/v4.0.0-beta.0
      // static: [paths.public],
      firewall: false,
      client: {
        host: HOST
      }
    },
    babel: {
      presets: ['@babel/preset-env'],
      plugins: ['@babel/plugin-proposal-class-properties']
    },
    postcss: {
      sourceMap: true,
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
            {
              // Options
            }
          ]
        ]
      }
    },
    sass: {
      sourceMap: true,
      // Prefer `dart-sass`
      implementation: require('sass')
    },
    eslint: {
      extensions: ['js', 'ts', 'jsx', 'tsx'],
      files: 'src',
      baseConfig: {
        extends: ['@fbi-js']
      }
    },
    stylelint: {
      files: 'src/**/*.{css,scss,tsx,jsx}',
      configFile: require.resolve('@fbi-js/stylelint-config'),
      // https://github.com/stylelint/stylelint/issues/4380#issuecomment-546302636
      allowEmptyInput: true
    },
    ...options
  }
}
