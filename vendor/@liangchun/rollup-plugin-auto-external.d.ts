declare module '@liangchun/rollup-plugin-auto-external' {
  import { PluginImpl } from 'rollup'
  type InferArg2<T> = T extends (arg1: any, arg2: infer R) => any ? R : any
  type Options = {
    builtins: boolean | string
    dependencies: boolean
    packagePath: string
    peerDependencies: boolean
    resolveOpts: InferArg2<RequireResolve>
  }
  const f: PluginImpl<Partial<Options>>
  export default f
}
