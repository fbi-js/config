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
  title?: string
  isTs?: boolean
  paths: PathsConfig
  definePluginData: Record<string, any>
  optimization: Configuration['optimization']
  performance: Configuration['performance']
  stats: Configuration['stats']
  devServer: Record<string, any>
  // https://github.com/babel/babel-loader#options
  babel: Record<string, any>
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

export interface ConfigFunctionParams {
  webpackConfig?: Configuration
  options?: Partial<Options>
}
