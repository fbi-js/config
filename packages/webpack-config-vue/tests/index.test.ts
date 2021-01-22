import config from '../'

describe('webpack config vue', () => {
  test('basic', () => {
    const result = config()
    expect(result).toMatchSnapshot()
  })

  test('with options', () => {
    const result = config({
      options: {
        isTs: true,
        eslint: {
          extensions: ['js', 'ts', 'jsx', 'tsx'],
          files: 'src',
          baseConfig: {
            extends: ['standard']
          }
        }
      }
    })
    expect(result).toMatchSnapshot()
  })

  test('with custom config', () => {
    const result = config({
      webpackConfig: {
        mode: 'none',
        module: {
          rules: [
            {
              // TODO: no effect
              test: /\.(j|t)sx?$/,
              exclude: 'xxx',
              use: {
                loader: 'babel-loader',
                options: {
                  plugins: ['yyy'],
                  presets: ['xxxxx']
                }
              }
            },
            {
              test: /\.svg(\?.*)?$/,
              type: 'asset',
              parser: {
                dataUrlCondition: {
                  maxSize: 100 * 1024 // 4kb
                }
              }
            }
          ]
        }
      }
    })
    expect(result).toMatchSnapshot()
  })
})
