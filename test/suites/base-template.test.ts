import { createBaseConfiguration } from '../../src/lib/configuration'
import { getFixturePaths, bundle } from '../utils'

describe('base-template', () => {
  it('should generate correct bundles on dev mode', async () => {
    const fixturePaths = getFixturePaths('base-template')
    const config = createBaseConfiguration({ dev: true }, fixturePaths)
    await bundle(fixturePaths, config)
  })
  it('should generate correct bundles on prod mode', async () => {
    const fixturePaths = getFixturePaths('base-template')
    const config = createBaseConfiguration({ dev: false }, fixturePaths)
    await bundle(fixturePaths, config)
  })
})
