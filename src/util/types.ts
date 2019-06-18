import { RollupError } from 'rollup'

export enum WatcherEventCodes {
  START = 'START',
  END = 'END',
  BUNDLE_START = 'BUNDLE_START',
  BUNDLE_END = 'BUNDLE_END',
  ERROR = 'ERROR',
  FATAL = 'FATAL',
}

export type WatcherStartEvent = {
  code: WatcherEventCodes.START
}
export type WatcherEndEvent = {
  code: WatcherEventCodes.END
}
export type WatcherBundleStartEvent = {
  code: WatcherEventCodes.BUNDLE_START
  input: string
  ouput: string[]
}
export type WatcherBundleEndEvent = {
  code: WatcherEventCodes.BUNDLE_END
  duration: number
  input: string
  output: string[]
  result: any // TODO: don't need this now
}
export type WatcherErrorEvent = {
  code: WatcherEventCodes.ERROR
  error: RollupError
}
export type WatcherFatalEvent = {
  code: WatcherEventCodes.FATAL
  error: RollupError
}

export type WatcherEventTypes =
  | WatcherStartEvent
  | WatcherEndEvent
  | WatcherBundleStartEvent
  | WatcherBundleEndEvent
  | WatcherErrorEvent
  | WatcherFatalEvent

export type WatcherState = {
  firstCompilation: boolean
}
