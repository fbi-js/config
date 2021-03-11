import path from 'path'
import { isProd } from '../utils'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const svgToMiniDataURI = require('mini-svg-data-uri')

export const getBaseCssLoaders = (options: any): any[] => {
  const isDev = !isProd()
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

export const getSvgLoaders = (options: any) => {
  const isDev = !isProd()
  const svgLoaders: any[] = [
    // suport SVG in CSS, Sass or Less
    {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      issuer: /\.(sc|sa|c|le)ss$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            esModule: false,
            generator: (content: any) => svgToMiniDataURI(content.toString()),
            name: isDev
              ? '[name].[hash].[ext]'
              : `${options.paths.assets}/[name].[hash].[ext]`
          }
        }
      ]
    }
  ]

  if (options.presets?.includes('react')) {
    svgLoaders.push({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      issuer: /\.(j|t)sx?$/,
      use: ['@svgr/webpack']
    })
  }

  if (options.presets?.includes('vue')) {
    svgLoaders.push(
      // suport SVG in js or ts
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.(j|t)sx?$/,
        use: ['babel-loader', '@svgr/webpack', 'url-loader']
      },
      // suport SVG in vue component
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.vue$/,
        // https://vue-svg-loader.js.org/faq.html#how-to-use-both-inline-and-external-svgs
        oneOf: [
          {
            use: [
              {
                // https://github.com/webpack-contrib/url-loader#options
                loader: 'url-loader',
                options: {
                  limit: 4 * 1024, // 4kb
                  esModule: false, // fix [object module] bug, link: https://blog.csdn.net/csstmg/article/details/110172097
                  name: isDev
                    ? '[name].[hash].[ext]'
                    : `${options.paths.assets}/[name].[hash].[ext]`
                }
              }
            ]
          },
          {
            resourceQuery: /inline/,
            use: ['vue-loader', 'vue-svg-loader']
          }
        ]
      }
    )
  }

  return svgLoaders
}

/**
 * get webpack module rules
 * @param options
 */
export const getModuleRules = (options: any) => {
  const isDev = !isProd()
  const baseCssLoaders = getBaseCssLoaders(options)
  const svgLoaders = getSvgLoaders(options)

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
    {
      test: /\.(mp4|mov|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
      type: 'asset/resource'
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      type: 'asset/resource'
    },
    ...svgLoaders
  ]
}
