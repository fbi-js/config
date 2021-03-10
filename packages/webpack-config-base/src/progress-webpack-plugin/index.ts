import CompactLogger from './logger/compact-logger'
import MinimalLogger from './logger/minimal-logger'
import VerboseLogger from './logger/verbose-logger'
import ExpandedLogger from './logger/expanded-logger'

// Disable the deprecation warning, popping up in the middle of the process
// (process as any).noDeprecation = true

function getOption (options: any, key: string, value: any) {
  // eslint-disable-next-line
  return options && options.hasOwnProperty(key) ? options[key] : value
}

export default class ProgressWebpackPlugin {
  constructor (options = {}) {
    const internalOptions = {
      format: getOption(options, 'format', 'compact'),
      color: getOption(options, 'color', true)
    }
    // Return the correct progress plugin
    switch (internalOptions.format) {
      case 'minimal':
        return MinimalLogger(internalOptions)
      case 'expanded':
      case 'extended':
        return ExpandedLogger(internalOptions)
      case 'verbose':
      case 'debug':
        return VerboseLogger(internalOptions)
      case 'compact':
      default:
        return CompactLogger(internalOptions)
    }
  }

  apply (compiler: any) {
    compiler.hooks.done.tap('ProgressWebpackPlugin', (
      _stats: any /* stats is passed as an argument when done hook is tapped.  */
    ) => {
      console.log('ProgressWebpackPlugin')
    })
  }
}
