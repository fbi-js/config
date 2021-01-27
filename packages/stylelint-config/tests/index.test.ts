import { join } from 'path'
import { lint } from 'stylelint'
import config from '../'

describe('eslint-config', () => {
  test('correct fixture', async () => {
    const result = await lint({
      config,
      files: join(__dirname, 'fixtures/form.less'),
      configOverrides: {
        rules: {
          'selector-pseudo-class-no-unknown': [
            true,
            {
              ignorePseudoClasses: ['global']
            }
          ]
        }
      }
    })
    expect(result.errored).toBeFalsy()
  })
})
