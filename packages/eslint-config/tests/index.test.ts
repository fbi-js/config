import { join } from 'path'
import { ESLint } from 'eslint'
import eslintConfig from '../'

const cli = new ESLint({
  baseConfig: {
    ...(eslintConfig as any),
    root: true
  },
  useEslintrc: false
})

describe('eslint-config', () => {
  test('correct fixture', async () => {
    const result = await cli.lintFiles(join(__dirname, 'fixtures/correct.js'))
    expect(result[0].errorCount).toBe(0)
  })

  test('incorrect fixture', async () => {
    const result = await cli.lintFiles(join(__dirname, 'fixtures/incorrect.js'))
    expect(result[0].errorCount).toBeGreaterThan(0)
  })
})
