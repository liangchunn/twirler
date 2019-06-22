import { createBaseConfiguration } from '../../src/lib/configuration'
import { getFixturePaths, bundleFixtures } from '../utils'

describe('builtins', () => {
  it('should not include builtins on dev mode', async () => {
    const fixturePaths = getFixturePaths('builtins')
    const config = createBaseConfiguration({ dev: true }, fixturePaths)
    await bundleFixtures(fixturePaths, config)
  })
  it('should not include builtins on prod mode', async () => {
    const fixturePaths = getFixturePaths('builtins')
    const config = createBaseConfiguration({ dev: false }, fixturePaths)
    await bundleFixtures(fixturePaths, config)
  })
})
