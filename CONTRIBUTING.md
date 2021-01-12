# Contribute Guide

## Pull Request Guidelines

- Checkout a topic branch from `main` branch, and merge back against that branch.
- Work in the `packages` folder.
- Use [fbi commit](https://github.com/fbi-js/factory-commands/blob/main/src/commands/commit/README.md) to commit your code.

    ```bash
    # install
    npx fbi add factory-commands
    # usage
    npx fbi commit
    ```

## Development

- Setup

   ```bash
   npm i -g fbi
   yarn
   ```

- Start development

   ```bash
   yarn dev
   ```

## Test

```bash
yarn test
```

## Build

```bash
yarn build
```

## Commit

```bash
npx fbi commit
```

## Release

```bash
yarn changeset

yarn bump

yarn release
```
