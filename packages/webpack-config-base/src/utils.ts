import { networkInterfaces } from 'os'

/**
 * get ip address with IPv4, default ip address is 0.0.0.0
 */
export const getIpAddress = (): string => {
  // code source: https://stackoverflow.com/questions/3653065/get-local-ip-address-in-node-js
  const nets = networkInterfaces()
  let ipAddress = '0.0.0.0'

  for (const name of Object.keys(nets)) {
    for (const net of nets[name] ?? []) {
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
export const isProd = (): boolean => {
  return process.env.NODE_ENV === 'production'
}

/**
 * node_env is development
 */
export const isDev = (): boolean => {
  return process.env.NODE_ENV !== 'production'
}
