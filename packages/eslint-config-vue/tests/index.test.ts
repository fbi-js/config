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

describe('eslint-config-vue', () => {
  test('correct', async () => {
    const result = await cli.lintFiles(join(__dirname, 'fixtures/correct.vue'))
    expect(result[0].errorCount).toBe(0)
    expect(result[0].warningCount).toBe(0)
  })

  test('incorrect indent', async () => {
    const result = await cli.lintFiles(join(__dirname, 'fixtures/incorrect.vue'))
    expect(result[0].warningCount).toBe(1)
  })
})
