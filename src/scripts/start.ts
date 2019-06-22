import * as rollup from 'rollup'

import { createConfiguration, ConfigurationType } from '../lib/configuration'
import { createWatchHandler } from '../util/watchHandler'

function start() {
  const config = createConfiguration({ dev: true })

  if (config.type !== ConfigurationType.DEV) {
    throw new Error(
      `Invalid config, expected ${ConfigurationType.DEV} config but got ${config.type} config.`
    )
  }

  const outputBundlePath = config.watchOptions.output.file!
  const watcher = rollup.watch([config.watchOptions])

  watcher.on('event', createWatchHandler(outputBundlePath))
}

start()
