import { Options } from '@fbi-js/webpack-config-base'

const isDev = process.env.NODE_ENV === 'development'

export default (options: Partial<Options> = {}): Partial<Options> => ({
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
