# Contribute Guide

## Pull Request Guidelines

- Folk the repository to your own account.
- Work in the `packages` folder.
- Use [fbi commit](https://github.com/fbi-js/factory-commands/blob/main/src/commands/commit/README.md) to commit your code.

    ```bash
    # install
    npx fbi add factory-commands
    # usage
    npx fbi commit
    ```
- Create a new pull request: https://github.com/fbi-js/config/compare

## Development

```bash
yarn
yarn build
yarn dev
```

## Test

```bash
yarn test
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
