import { createBaseConfiguration } from '../../src/lib/configuration'
import { getFixturePaths, bundleFixtures } from '../utils'

/**
 * This test desribes a default interop being hoisted with _interopDefault.
 * Problems can arise when requiring modules such are `debug`, where it reads process.env.NODE_ENV
 * once and then never reads it again.
 *
 * The following is a TLDR of the fixture code in TypeScript:
 *    process.env.DEBUG = '*'
 *    import debug from 'debug'
 *    debug('app')('This is a debug message')
 *
 * When running the bundle, nothing will log. This is because `debug` is hoiseted by Rollup:
 *    var debug = _interopDefault(require('debug'));
 *    process.env.NODE_ENV = 'development';
 *    debug('app')('This is a debug message');
 */
describe('import-order', () => {
  it('should generate correct bundles on dev mode', async () => {
    const fixturePaths = getFixturePaths('import-order')
    const config = createBaseConfiguration({ dev: true }, fixturePaths)
    await bundleFixtures(fixturePaths, config)
  })
  it('should generate correct bundles on prod mode', async () => {
    const fixturePaths = getFixturePaths('import-order')
    const config = createBaseConfiguration({ dev: false }, fixturePaths)
    await bundleFixtures(fixturePaths, config)
  })
})
