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
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      }
    ]
  }
}
