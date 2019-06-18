import { WarningHandlerWithDefault } from 'rollup'

export const overrideOnWarn: WarningHandlerWithDefault = warning => {
  /**
   * Suppresses the warning:
   * `The this keyword is equivalent to undefined at the top level of an ES module, and has been rewritten`
   * Reference:
   * https://github.com/rollup/rollup/issues/794#issuecomment-262395554
   */
  if (typeof warning !== 'string' && warning.code === 'THIS_IS_UNDEFINED') {
    return
  } else {
    console.warn(warning)
  }
}
