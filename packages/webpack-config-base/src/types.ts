import { Configuration } from 'webpack'
import { CustomizeRule } from 'webpack-merge'

export interface PathsConfig {
  cwd: string
  src: string
  dist: string
  public: string
  js: string
  css: string
  cssExtractPublicPath: string
  img: string
  assets: string
}

declare type MergeRules = {
  [s: string]: CustomizeRule | MergeRules
}

export interface Options {
  // project title (used by html-webpack-plugin and webpackbar)
  title?: string
  // using typescript or not
  isTs?: boolean
  // common paths config
  paths: PathsConfig
  // used by webpack.DefinePlugin. https://webpack.js.org/plugins/define-plugin/
  definePluginData: Record<string, any>
  // https://webpack.js.org/configuration/optimization/
  optimization: Configuration['optimization']
  // https://webpack.js.org/configuration/performance/
  performance: Configuration['performance']
  // https://webpack.js.org/configuration/stats/
  stats: Configuration['stats']
  // https://webpack.js.org/configuration/dev-server/
  devServer: Record<string, any>
  // https://github.com/babel/babel-loader#options
  babel: Record<string, any>
  // https://github.com/webpack-contrib/css-loader#options
  css: Record<string, any>
  // https://github.com/webpack-contrib/postcss-loader#options
  postcss: Record<string, any>
  // https://github.com/webpack-contrib/sass-loader#options
  sass: Record<string, any>
  // https://github.com/webpack-contrib/less-loader#options
  less: Record<string, any>
  // https://github.com/webpack-contrib/eslint-webpack-plugin#options
  eslint: Record<string, any>
  // https://github.com/webpack-contrib/stylelint-webpack-plugin#options
  stylelint: Record<string, any>
  // https://github.com/survivejs/webpack-merge#mergewithrules
  mergeRules: MergeRules
}

export interface PartialOptions extends Partial<Omit<Options, 'paths'>> {
  paths?: Partial<PathsConfig>
}

export interface ConfigFunctionParams {
  webpackConfig?: Configuration
  options?: PartialOptions
}
