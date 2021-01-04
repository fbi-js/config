import { Configuration } from 'webpack'
import webpackConfigBase, {
  merge,
  ConfigFunctionParams
} from '@fbi-js/webpack-config-base'

import resolveOptions from './options'

export default ({
  webpackConfig,
  options
}: ConfigFunctionParams = {}): Configuration => {
  const baseConfig = webpackConfigBase({
    options: resolveOptions(options)
  })

  return merge(baseConfig, webpackConfig || {})
}
