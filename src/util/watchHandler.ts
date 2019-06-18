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

const state: WatcherState = {
  firstCompilation: true,
}

function bundleEndHandler(event: WatcherBundleEndEvent): void {
  console.log(
    `${chalk.green('Compiled successfully!')} ${chalk.dim(
      `(${event.duration}ms)`
    )}`
  )
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

export function watchHandler(event: WatcherEventTypes) {
  switch (event.code) {
    case WatcherEventCodes.BUNDLE_START: {
      clearConsole()
      return bundleStartHandler(state)
    }
    case WatcherEventCodes.BUNDLE_END: {
      clearConsole()
      return bundleEndHandler(event)
    }
    case WatcherEventCodes.ERROR: {
      clearConsole()
      return errorHandler(event)
    }
    case WatcherEventCodes.FATAL: {
      return fatalHandler(event)
    }
  }
}
