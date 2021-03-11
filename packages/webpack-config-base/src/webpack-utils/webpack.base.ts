import path from 'path'
import { isProd } from '../utils'

export const getDevTools = (_options: any) => {
  const isDev = !isProd()
  if (isDev) {
    return 'eval-cheap-module-source-map'
  }
  return false
}

export const getEntryConfig = (options: any) => {
  const isTs = options.presets?.includes('typescript')
  const suffix = isTs ? 'ts' : 'js'
  return options.entry || path.join(options.paths.src, `main.${suffix}`)
}

export const getOutputConfig = (options: any) => {
  const isDev = !isProd()
  if (isDev) {
    return {
      path: options.paths.dist,
      publicPath: '/',
      filename: '[name].js?v=[fullhash]',
      assetModuleFilename: '[name].[hash][ext][query]'
    }
  } else {
    return {
      path: options.paths.dist,
      publicPath: process.env.ASSET_PATH ?? '/',
      filename: `${options.paths.js}/[name].[fullhash].js`,
      assetModuleFilename: `${options.paths.assets}/[name].[hash][ext][query]`
    }
  }
}

export const getCacheConfig = (_options: any) => {
  return {
    type: 'filesystem'
  }
}

export const getResolveConfig = (_options: any) => {
  const resolveConfig = {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.mjs', '.wasm', '.json'],
    modules: [
      'node_modules',
      path.join(__dirname, '../../node_modules'),
      // TODO: remove
      path.join(__dirname, '../../../../node_modules')
    ],
    alias: {
      '@': path.resolve('src/')
    }
  }
  return resolveConfig
}

export const getResolveLoader = (_options: any) => {
  const resolveLoader = {
    modules: [
      'node_modules',
      path.join(__dirname, '../../node_modules'),
      // TODO: remove
      path.join(__dirname, '../../../../node_modules')
    ]
  }

  return resolveLoader
}

export const getCustomOptions = (options: any) => {
  const isDev = !isProd()
  const customDevOptions = {
    devServer: options.devServer
  }

  const customeProdOptions = {
    optimization: options.optimization,
    performance: options.performance
  }

  return isDev ? customDevOptions : customeProdOptions
}
