import { Configuration } from 'webpack'
import webpackConfigBase, {
  ConfigFunctionParams
} from '@fbi-js/webpack-config-base'
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import resolveOptions from './options'

const isDev = process.env.NODE_ENV === 'development'

export default ({
  options,
  webpackConfig
}: ConfigFunctionParams = {}): Configuration => {
  if (isDev) {
    // this make react fast refresh work, https://github.com/pmmmwh/react-refresh-webpack-plugin#usage
    webpackConfig?.plugins?.push(new ReactRefreshPlugin())
  }
  return webpackConfigBase({
    options: resolveOptions(options),
    webpackConfig
  })
}
