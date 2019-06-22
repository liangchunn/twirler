import os from 'os'
import path from 'path'
import chalk from 'chalk'
import typescript from 'typescript'
import * as rollup from 'rollup'

import { createConfiguration, ConfigurationType } from '../lib/configuration'
import { paths } from '../lib/paths'
import { getBundleSize, diffFileSize } from '../util/bundleSize'

async function build() {
  try {
    const config = createConfiguration({ dev: false })

    if (config.type !== ConfigurationType.PROD) {
      throw new Error(
        `Invalid config, expected ${ConfigurationType.PROD} config but got ${config.type} config.`
      )
    }

    const { inputOptions, outputOptions } = config

    const outputBundle = outputOptions.file!
    const sizeBeforeBuild = getBundleSize(outputBundle)

    console.log(chalk.cyan('Creating optimized production build...'))
    console.log(`Using TypeScript v${typescript.version}`)
    console.log()

    const bundle = await rollup.rollup(inputOptions)
    await bundle.generate(outputOptions)
    await bundle.write(outputOptions)

    const sizeAfterBuild = getBundleSize(outputBundle)

    console.log(
      chalk.green(
        `Successfully created bundle in ${path.relative(
          process.cwd(),
          paths.appProdBundle
        )}`
      )
    )
    console.log('Bundle size: ' + diffFileSize(sizeBeforeBuild, sizeAfterBuild))
    console.log()
  } catch (error) {
    console.log(chalk.redBright('Failed to compile.'), os.EOL)
    console.error(error.stack)
    process.exit(1)
  }
}

build()
