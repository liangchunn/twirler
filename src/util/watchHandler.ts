import os from 'os'
import typescript from 'typescript'
import chalk from 'chalk'
import { clearConsole } from './console'
import { rpt2Formatter } from './rpt2Formatter'
import {
  WatcherEventTypes,
  WatcherEventCodes,
  WatcherBundleEndEvent,
  WatcherState,
  WatcherErrorEvent,
  WatcherFatalEvent,
} from './types'
import { ProcessHandler } from './processHandler'

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

export function fatalHandler(event: WatcherFatalEvent): void {
  const { error } = event
  console.log(chalk.redBright('A fatal error has occurred.'), os.EOL)
  console.error(error.stack)
  process.exit(1)
}

export function createWatchHandler(outputBundlePath: string) {
  const processHandler = new ProcessHandler(outputBundlePath, [])
  const state: WatcherState = {
    firstCompilation: true,
  }
  return (event: WatcherEventTypes): void => {
    switch (event.code) {
      case WatcherEventCodes.BUNDLE_START: {
        clearConsole()
        bundleStartHandler(state)
        processHandler.stopApp()
        return
      }
      case WatcherEventCodes.BUNDLE_END: {
        clearConsole()
        bundleEndHandler(event)
        processHandler.runApp()
        return
      }
      case WatcherEventCodes.ERROR: {
        clearConsole()
        errorHandler(event)
        processHandler.stopApp()
        return
      }
      case WatcherEventCodes.FATAL: {
        fatalHandler(event)
        processHandler.stopApp()
        process.exit(1)
        return
      }
    }
  }
}
