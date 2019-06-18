import chalk from 'chalk'
import * as rollup from 'rollup'
import typescript from 'typescript'

import { createWatchConfiguration } from '../lib/configuration'
import { clearConsole } from '../util/Console'
import { rpt2Formatter } from '../util/RPT2Formatter'

let compiled: number = 0

const config = createWatchConfiguration()
const watcher = rollup.watch([config])

watcher.on('event', event => {
  switch (event.code) {
    case 'START':
      //   console.log(event)
      break
    case 'ERROR': {
      clearConsole()
      const { plugin } = event.error
      if (plugin === 'rpt2') {
        const { message, id: file } = event.error
        const prettifiedMessage = rpt2Formatter(message, file)
        console.log(prettifiedMessage)
      } else {
        console.log(event.error)
      }
      break
    }
    case 'BUNDLE_START':
      clearConsole()
      if (!compiled) {
        compiled |= 1
        console.log(chalk.cyan('Starting development server on watch mode...'))
        console.log(`Using TypeScript v${typescript.version}`)
      } else {
        console.log(chalk.yellow('Changes detected, rebundling...'))
      }
      break
    case 'BUNDLE_END':
      clearConsole()
      console.log(
        `${chalk.green('Compiled successfully!')} ${chalk.dim(
          `(${event.duration}ms)`
        )}`
      )
      break
    case 'FATAL':
      throw event.error
  }
})
