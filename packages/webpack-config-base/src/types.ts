import { Configuration } from 'webpack'

export interface IFactoryPaths {
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

export type ConfigFunctionParams = {
  webpackConfig?: Configuration
  options: Record<string, any>
}
