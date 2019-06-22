import path from 'path'

import * as rollup from 'rollup'

import { paths } from '../src/lib/paths'
import { BaseConfiguration } from '../src/lib/configuration'

export async function bundleFixtures(
  appPaths: typeof paths,
  baseConfig: BaseConfiguration
) {
  process.chdir(path.dirname(appPaths.projectPath))

  const bundle = await rollup.rollup(baseConfig.inputOptions)
  const result = await bundle.generate(baseConfig.outputOptions)
  const code = result.output[0].code
  expect(code).toMatchSnapshot()
}

export function getFixturePaths(fixtureAppName: string): typeof paths {
  return {
    projectPath: path.resolve(__dirname, `./fixtures/${fixtureAppName}/`),
    appPackageJson: path.resolve(
      __dirname,
      `./fixtures/${fixtureAppName}/package.json`
    ),
    appEntry: path.resolve(
      __dirname,
      `./fixtures/${fixtureAppName}/src/index.ts`
    ),
    appTsConfig: path.resolve(
      __dirname,
      `./fixtures/${fixtureAppName}/tsconfig.json`
    ),
    appDevBundle: path.resolve(
      __dirname,
      `./fixtures/${fixtureAppName}/build/bundle.js`
    ),
    appSrc: path.resolve(__dirname, `./fixtures/${fixtureAppName}/src`),
    appProdBundle: path.resolve(
      __dirname,
      `./fixtures/${fixtureAppName}/dist/bundle.js`
    ),
  }
}
