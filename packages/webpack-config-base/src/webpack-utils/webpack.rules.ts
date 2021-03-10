import path from 'path'
import { isProd } from '../utils'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const isDev = !isProd()

export const getBaseCssLoaders = (options: any): any[] => {
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

  return baseCssLoaders
}

/**
 * get webpack module rules
 * @param options
 */
export const getModuleRules = (options: any) => {
  const baseCssLoaders = getBaseCssLoaders(options)
  return [
    {
      test: /\.(j|t)sx?$/,
      exclude: path.resolve('node_modules'),
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
}
