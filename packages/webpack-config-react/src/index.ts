import { Configuration } from 'webpack'
import webpackConfigBase, {
  ConfigFunctionParams
} from '@fbi-js/webpack-config-base'

import resolveOptions from './options'

export default ({
  options,
  webpackConfig
}: ConfigFunctionParams = {}): Configuration =>
  webpackConfigBase({
    options: resolveOptions(options),
    webpackConfig
  })
