# @fbi-js/webpack-config-vue

Webpack config for Vue.js project.

## Usage

```bash
npm i -D @fbi-js/webpack-config-vue
```

- `./webpack.config.js`

  ```js
  const config = require('@fbi-js/webpack-config-vue').default

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
  import config from '@fbi-js/webpack-config-vue'

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
  // https://github.com/webpack-contrib/eslint-webpack-plugin#options
  eslint: Record<string, any>
  // https://github.com/webpack-contrib/stylelint-webpack-plugin#options
  stylelint: Record<string, any>
}
```


## License

Licensed under [MIT](https://opensource.org/licenses/MIT).