import * as rollup from 'rollup'

import { createBuildConfiguration } from '../lib/configuration'

async function build() {
  const { inputOptions, outputOptions } = createBuildConfiguration()
  const bundle = await rollup.rollup(inputOptions)
  await bundle.generate(outputOptions)
  await bundle.write(outputOptions)
}

build()
