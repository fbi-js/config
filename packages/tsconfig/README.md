# @fbi-js/tsconfig

## Usage

```bash
npm i -D @fbi-js/tsconfig
```

`./tsconfig.json`:

- Normal typescript project

  ```json
  {
    "extends": "@fbi-js/tsconfig/base",
    "compilerOptions": {
      "outDir": "./lib"
    }
  }
  ```

- React.js typescript project

  ```json
  {
    "extends": "@fbi-js/tsconfig/react",
    "compilerOptions": {
      "baseUrl": "./",
      "outDir": "dist"
    }
  }
  ```

- Vue.js typescript project

  ```json
  {
    "extends": "@fbi-js/tsconfig/vue",
    "compilerOptions": {
      "baseUrl": "./",
      "outDir": "dist"
    },
    "include": ["src"]
  }
  ```

## License

Licensed under [MIT](https://opensource.org/licenses/MIT).
