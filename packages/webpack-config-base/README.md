# @fbi-js/webpack-config-base

Webpack base config.

## Features

- JavaScript
- TypeScript
- SASS
- LESS
- PostCSS
- ESLint
- StyleLint

## Usage

```bash
npm i -D @fbi-js/webpack-config-base webpack@5 webpack-dev-server@next
```

- `./webpack.config.js`

  ```js
  const config = require('@fbi-js/webpack-config-base').default

  // default
  module.exports = config()

  // extends
  module.exports = {
    ...config(),
    entry: './index.js'
  }

  // with options
  module.exports = config({
    options: {
      isTs: true
    }
  })
  ```

- or `./webpack.config.ts`

  ```ts
  import config from '@fbi-js/webpack-config-base'

  // default
  export default config()

  // extends
  export default {
    ...config(),
    entry: './index.js'
  }

  // with options
  export default config({
    options: {
      isTs: true
    }
  })
  ```

## Options

```ts
interface Options {
  // project title (used by html-webpack-plugin and webpackbar)
  title?: string
  // using typescript or not
  isTs?: boolean
  // common paths config. Type: https://github.com/fbi-js/config/blob/main/packages/webpack-config-base/src/types.ts#L4
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
```

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
