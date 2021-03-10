import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import { CustomizeRule } from 'webpack-merge'

import { resolve } from 'path'
import { Options, PartialOptions } from '../types'
import { isProd } from '../utils'

const cwd = process.cwd()
const PORT = 9000
const HOST = '0.0.0.0'

export const defaults = {
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
  performance: {
    hints: false as any,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  optimization: {
    minimize: true,
    minimizer: ['...', new CssMinimizerPlugin()] as any,
    // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
    // instead of having their own. This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
    runtimeChunk: {
      name: 'runtime'
    },
    chunkIds: 'named' as any
  },
  devServer: {
    // historyApiFallback: true,
    compress: true,
    open: false,
    overlay: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Methods': '*'
    },
    hot: true,
    transportMode: 'ws',
    injectClient: true,
    liveReload: false,
    host: '0.0.0.0',
    port: PORT,
    // https://github.com/webpack/webpack-dev-server/releases/tag/v4.0.0-beta.0
    // static: [paths.public],
    firewall: false,
    client: {
      host: HOST,
      port: PORT
    }
  },
  babel: {
    presets: [
      [
        '@babel/preset-env'
      ]
    ],
    plugins: ['@babel/plugin-proposal-class-properties']
  },
  postcss: {
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
    // Prefer `dart-sass`
    implementation: require('sass')
  },
  less: {
    lessOptions: {
      javascriptEnabled: true
    }
  },
  eslint: {
    extensions: ['js', 'ts', 'jsx', 'tsx'],
    files: 'src',
    emitError: true,
    emitWarning: true,
    failOnError: true,
    baseConfig: {
      extends: ['@fbi-js']
    }
  },
  stylelint: {
    files: 'src/**/*.{css,scss,less}',
    // https://github.com/stylelint/stylelint/issues/4380#issuecomment-546302636
    allowEmptyInput: true
  },
  mergeRules: {
    resolve: {
      extensions: CustomizeRule.Prepend
    },
    module: {
      rules: {
        test: CustomizeRule.Match,
        issuer: CustomizeRule.Match,
        use: CustomizeRule.Replace,
        oneOf: CustomizeRule.Replace,
        loaders: CustomizeRule.Replace
        // type: CustomizeRule.Replace,
        // loaders: {
        //   loader: CustomizeRule.Replace,
        //   options: CustomizeRule.Replace
        // }
      }
    }
  }
}

export const resolveOptions = (options: PartialOptions = {}): Options => {
  const isDev = !isProd()

  const mergeOptions = {
    ...options,
    paths: {
      ...defaults.paths,
      ...options.paths
    },
    definePluginData: {
      ...options.definePluginData
    },
    performance: {
      ...defaults.performance,
      ...options.performance
    },
    optimization: {
      ...defaults.optimization,
      ...options.optimization
    },
    stats: isDev
      ? {
          all: false,
          colors: true,
          errors: true,
          ...(options.stats as any)
        }
      : {
          all: false,
          colors: true,
          errors: true,
          timings: true,
          assetsSort: '!size',
          assets: true,
          excludeAssets: [/\.*\.map/],
          ...(options.stats as any)
        },
    devServer: {
      ...defaults.devServer,
      ...options.devServer
    },
    babel: {
      ...defaults.babel,
      ...options.babel
    },
    css: {
      sourceMap: true,
      importLoaders: 2,
      modules: {
        localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64]',
        exportLocalsConvention: 'camelCaseOnly',
        auto: true
      }
    },
    postcss: {
      ...defaults.postcss,
      sourceMap: isDev,
      ...options.postcss
    },
    sass: {
      ...defaults.sass,
      sourceMap: isDev,
      ...options.sass
    },
    less: {
      ...defaults.less,
      sourceMap: isDev,
      ...options.less
    },
    eslint: {
      ...defaults.eslint,
      ...options.eslint
    },
    stylelint: {
      ...defaults.stylelint,
      ...options.stylelint
    },
    mergeRules: {
      ...defaults.mergeRules,
      ...options.mergeRules
    }
  }

  return mergeOptions
}
