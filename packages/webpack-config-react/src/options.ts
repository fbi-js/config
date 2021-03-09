import { PartialOptions } from '@fbi-js/webpack-config-base'
import { Configuration } from 'webpack'

const isDev = process.env.NODE_ENV === 'development'

export default (options: PartialOptions = {}): PartialOptions => ({
  ...options,
  babel: {
    presets: [
      '@babel/preset-env',
      [
        '@babel/preset-react',
        {
          runtime: 'automatic'
        }
      ]
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties',
      isDev && 'react-refresh/babel'
    ].filter(Boolean),
    ...options.babel
  },
  eslint: {
    extensions: ['js', 'ts', 'jsx', 'tsx'],
    files: 'src',
    baseConfig: {
      extends: [options?.isTs ? '@fbi-js/react-typescript' : '@fbi-js/react']
    },
    ...options.eslint
  }
})

export const defaultConfig: Configuration = {
  module: {
    rules: [
      // https://github.com/gregberge/svgr/issues/396#issuecomment-714866066
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: /\.(j|t)sx$/,
        // https://vue-svg-loader.js.org/faq.html#how-to-use-both-inline-and-external-svgs
        oneOf: [
          {
            use: [
              {
                // https://github.com/webpack-contrib/url-loader#options
                loader: 'url-loader',
                options: {
                  limit: 4 * 1024, // 4kb
                  esModule: false // fix [object module] bug, link: https://blog.csdn.net/csstmg/article/details/110172097
                }
              }
            ]
          },
          {
            resourceQuery: /inline/,
            use: ['@svgr/webpack']
          }
        ]
      }
    ]
  }
}
