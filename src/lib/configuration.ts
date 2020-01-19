import autoExternal from '@liangchun/rollup-plugin-auto-external'
import { InputOptions, OutputOptions, Plugin, RollupWatchOptions } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import del from 'rollup-plugin-delete'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import { overrideOnWarn } from '../util/overrides'
import { paths } from './paths'

export enum ConfigurationType {
  DEV = 'DEV',
  PROD = 'PROD',
}

export type BaseConfiguration = {
  inputOptions: InputOptions
  outputOptions: OutputOptions
}

export type Configuration =
  | {
      type: ConfigurationType.PROD
      inputOptions: InputOptions
      outputOptions: OutputOptions
    }
  | {
      type: ConfigurationType.DEV
      watchOptions: RollupWatchOptions
    }

export type ConfigurationOptions = {
  dev: boolean
}

export function createBaseConfiguration(
  opts: ConfigurationOptions,
  path: typeof paths
): BaseConfiguration {
  const { dev } = opts

  const inputOptions: InputOptions = {
    input: path.appEntry,
    plugins: [
      del({ targets: 'build/*' }),
      resolve(),
      commonjs(),
      json(),
      autoExternal({
        packagePath: path.appPackageJson,
        resolveOpts: {
          paths: [path.projectPath],
        },
      }),
      typescript({
        tsconfig: path.appTsConfig,
      }),
      !dev && terser(),
    ].filter(Boolean) as Plugin[],
    onwarn: overrideOnWarn,
  }

  const outputOptions: OutputOptions = {
    file: dev ? path.appDevBundle : path.appProdBundle,
    format: 'cjs',
    sourcemap: dev ? 'inline' : true,
  }

  return {
    inputOptions,
    outputOptions,
  }
}

export function createConfiguration(opts: ConfigurationOptions) {
  const { dev } = opts
  const { inputOptions, outputOptions } = createBaseConfiguration(opts, paths)

  return dev
    ? ({
        type: ConfigurationType.DEV,
        watchOptions: {
          ...inputOptions,
          output: outputOptions,
          ...{
            watch: {
              /**
               * TODO: switch to true once rollup can correctly resolve `chokidar`
               * https://github.com/rollup/rollup/issues/2934
               */
              chokidar: false,
            },
          },
        },
      } as const)
    : ({
        type: ConfigurationType.PROD,
        inputOptions,
        outputOptions,
      } as const)
}
