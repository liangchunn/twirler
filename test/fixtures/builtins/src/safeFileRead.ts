import { readFileSync } from 'fs'

type Nothing = null
type Just<T> = T
type Maybe<T> = Just<T> | Nothing
type InferArg2<T> = T extends (arg1: any, arg2: infer A) => any ? A : never

export function safeFileRead(
  path: string,
  options?: InferArg2<typeof readFileSync>
): Maybe<string | Buffer> {
  try {
    return readFileSync(path, options)
  } catch (e) {
    return null
  }
}
