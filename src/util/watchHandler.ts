import os from 'os'
import typescript from 'typescript'
import chalk from 'chalk'
import { clearConsole } from './console'
import { rpt2Formatter } from './rpt2Formatter'
import { WatcherBundleEndEvent, WatcherState, WatcherErrorEvent } from './types'
import { ProcessHandler } from './processHandler'
import { RollupWatcherEvent } from 'rollup'

function bundleEndHandler(event: WatcherBundleEndEvent): void {
  console.log(
    `${chalk.green('Compiled successfully!')} ${chalk.dim(
      `(${event.duration}ms)`
    )}`
  )
  console.log()
}

function bundleStartHandler(state: WatcherState): void {
  if (state.firstCompilation) {
    state.firstCompilation = false
    console.log(chalk.cyan('Starting development server on watch mode...'))
    console.log(`Using TypeScript v${typescript.version}`)
  } else {
    console.log(chalk.yellow('Changes detected, rebundling...'))
  }
}

function errorHandler(event: WatcherErrorEvent): void {
  const { error } = event
  // handle errors coming from `rollup-plugin-typescript2`
  if (error.plugin === 'rpt2') {
    const { message, id: file } = error
    console.log(rpt2Formatter(message, file || 'Unknown source'))
  } else {
    console.log(chalk.redBright('An error has occurred.'), os.EOL)
    console.error(error.stack)
  }
}

export function createWatchHandler(outputBundlePath: string) {
  const processHandler = new ProcessHandler(outputBundlePath, [])
  const state: WatcherState = {
    firstCompilation: true,
  }
  return (event: RollupWatcherEvent): void => {
    switch (event.code) {
      case 'START': {
        clearConsole()
        bundleStartHandler(state)
        processHandler.stopApp()
        return
      }
      case 'BUNDLE_END': {
        clearConsole()
        bundleEndHandler(event)
        processHandler.runApp()
        return
      }
      case 'ERROR': {
        clearConsole()
        errorHandler(event)
        processHandler.stopApp()
        return
      }
    }
  }
}
