import 'node'
import Vue from 'vue'

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
  }
}

declare module '*.vue' {
  export default Vue
}

declare module '*.js'
