declare module 'rollup-plugin-terser' {
  import { PluginImpl } from 'rollup'
  import { MinifyOptions } from 'terser'
  type Options = {
    sourcemap: boolean
    numWorkers: number
  } & MinifyOptions
  const terser: PluginImpl<Partial<Options>>
  export { terser }
}
