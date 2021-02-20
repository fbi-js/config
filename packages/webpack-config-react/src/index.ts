import { Configuration } from 'webpack'
import webpackConfigBase, {
  webpackMerge,
  resolveOptions,
  ConfigFunctionParams
} from '@fbi-js/webpack-config-base'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import getOptions, { defaultConfig } from './options'

const isDev = process.env.NODE_ENV === 'development'

export default ({
  webpackConfig,
  options: userOptions
}: ConfigFunctionParams = {}): Configuration => {
  const reactOptions = getOptions(userOptions)
  const options = resolveOptions(reactOptions)
  let webpackDefaultConfig = defaultConfig

  if (isDev) {
    webpackDefaultConfig = {
      ...defaultConfig,
      plugins: [
        // this make react fast refresh work, https://github.com/pmmmwh/react-refresh-webpack-plugin#usage
        new ReactRefreshPlugin()
      ]
    }
  }
  let config = webpackConfig

  config = webpackMerge.mergeWithRules(options.mergeRules)(
    webpackDefaultConfig,
    webpackConfig ?? {}
  )

  return webpackConfigBase({
    options: resolveOptions(options),
    webpackConfig: config
  }) as Configuration
}
