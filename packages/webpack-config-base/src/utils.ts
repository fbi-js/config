import { IFactoryPaths } from './types'

import { networkInterfaces } from 'os'
import { paths } from './defaults'

/**
 * get ip address with IPv4, default ip address is 0.0.0.0
 */
export const getIpAddress = () => {
  // code source: https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
  const nets = networkInterfaces()
  let ipAddress = '0.0.0.0'

  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net?.family === 'IPv4' && !net?.internal && name === 'en0') {
        ipAddress = net.address
      }
    }
  }
  return ipAddress
}

/**
 * get node_env
 */
export const getEnvMode = (): 'production' | 'none' | 'development' => {
  return process.env.NODE_ENV === 'development' ? 'development' : 'production'
}

/**
 * node_env is production
 */
export const isProd = () => {
  return process.env.NODE_ENV === 'production'
}

/**
 * node_env is development
 */
export const isDev = () => {
  return !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
}

/**
 * merge paths in ../configs/constant/paths & fbi.paths in package.json
 * @param userPaths fbi.paths in package.json
 */
export const getMergePaths = (userPaths?: IFactoryPaths) => {
  return {
    ...paths,
    ...userPaths
  }
}
