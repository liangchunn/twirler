import { RollupError, InputOption, RollupBuild } from 'rollup'

export type WatcherStartEvent = {
  code: 'START'
}
export type WatcherEndEvent = {
  code: 'END'
}
export type WatcherBundleStartEvent = {
  code: 'BUNDLE_START'
  input: InputOption
  ouput: readonly string[]
}
export type WatcherBundleEndEvent = {
  code: 'BUNDLE_END'
  duration: number
  input: InputOption
  output: readonly string[]
  result: RollupBuild
}
export type WatcherErrorEvent = {
  code: 'ERROR'
  error: RollupError
}

export type WatcherEventTypes =
  | WatcherStartEvent
  | WatcherEndEvent
  | WatcherBundleStartEvent
  | WatcherBundleEndEvent
  | WatcherErrorEvent

export type WatcherState = {
  firstCompilation: boolean
}
