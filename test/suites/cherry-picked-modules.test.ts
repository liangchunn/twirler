import { createBaseConfiguration } from '../../src/lib/configuration'
import { getFixturePaths, bundleFixtures } from '../utils'

describe('cherry-picked-modules', () => {
  it('should generate correct bundles on dev mode', async () => {
    const fixturePaths = getFixturePaths('cherry-picked-modules')
    const config = createBaseConfiguration({ dev: true }, fixturePaths)
    await bundleFixtures(fixturePaths, config)
  })
  it('should generate correct bundles on prod mode', async () => {
    const fixturePaths = getFixturePaths('cherry-picked-modules')
    const config = createBaseConfiguration({ dev: false }, fixturePaths)
    await bundleFixtures(fixturePaths, config)
  })
})
