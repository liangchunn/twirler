import { existsSync, readFileSync } from 'fs'
import { EOL } from 'os'
import stripAnsi from 'strip-ansi'
import chalk from 'chalk'
import { codeFrameColumns } from '@babel/code-frame'

/**
 * Formats errors thrown by `rollup-plugin-typescript2` into a prettified code-frame error.
 * Example error from `rollup-plugin-typescript2`:
 * Error: /src/index.ts(4,7): semantic error TS2322: Type 'string' is not assignable to type 'boolean'.
 */
export function rpt2Formatter(rawError: string, file: string) {
  const error = stripAnsi(rawError)

  const lines = error.match(/\((\d)+,(\d)+\)/)
  const tsmessage = error.match(/(?<=TS(\d)+: )([\s\S])+/)
  const tscode = error.match(/TS(\d)+/)

  const source = file && existsSync(file) && readFileSync(file, 'utf-8')

  if (source && lines && tsmessage && tscode) {
    const frame = codeFrameColumns(
      source,
      {
        start: {
          line: parseInt(lines[1], 10),
          column: parseInt(lines[2], 10),
        },
      },
      {
        highlightCode: true,
      }
    )
    return (
      chalk.underline(file + `(${lines[1]},${lines[2]})`) +
      EOL +
      tsmessage[0] +
      ' ' +
      chalk.cyan(`(${tscode[0]})`) +
      EOL +
      EOL +
      frame
    )
  } else {
    return error
  }
}
