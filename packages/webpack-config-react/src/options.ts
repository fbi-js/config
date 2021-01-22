import { Options } from '@fbi-js/webpack-config-base'

export default (options: Partial<Options> = {}): Partial<Options> => ({
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
    plugins: ['@babel/plugin-proposal-class-properties']
  },
  eslint: {
    extensions: ['js', 'ts', 'jsx', 'tsx'],
    files: 'src',
    baseConfig: {
      extends: [options?.isTs ? '@fbi-js/react-typescript' : '@fbi-js/react']
    }
  },
  ...options
})
