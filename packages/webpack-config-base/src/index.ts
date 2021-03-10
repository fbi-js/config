import { ConfigFunctionParams } from './types'
import { Configuration } from 'webpack'
// import WebpackBar from 'webpackbar'
import * as webpackMerge from 'webpack-merge'
import { getEnvMode } from './utils'
import * as webpackUtils from './webpack-utils'
import { defaults as defaultOptions, resolveOptions } from './webpack-utils'

export * from './types'
export * from './utils'

export { webpackMerge, resolveOptions, defaultOptions }

export default ({
  options: userOptions,
  webpackConfig
}: ConfigFunctionParams = {}): Configuration => {
  const options = resolveOptions(userOptions)

  if (options.isTs) {
    options.babel?.presets.push('@babel/preset-typescript')
  }

  const config = {
    mode: getEnvMode(),
    devtool: webpackUtils.getDevTools(options),
    entry: webpackUtils.getEntryConfig(options),
    output: webpackUtils.getOutputConfig(options),
    cache: webpackUtils.getCacheConfig(options),
    module: {
      rules: webpackUtils.getModuleRules(options)
    },
    plugins: webpackUtils.getWebpackPlugins(options),
    resolve: webpackUtils.getResolveConfig(options),
    resolveLoader: webpackUtils.getResolveLoader(options),
    stats: options.stats,
    ...webpackUtils.getCustomOptions(options)
  }

  return webpackMerge.mergeWithRules(options.mergeRules)(
    config,
    webpackConfig ?? {}
  )
}
