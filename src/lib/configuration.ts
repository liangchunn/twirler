import { RollupWatchOptions, InputOptions, OutputOptions, Plugin } from 'rollup'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import autoExternal from '@liangchun/rollup-plugin-auto-external'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import json from 'rollup-plugin-json'

import { paths } from './paths'
import { overrideOnWarn } from '../util/overrides'

export enum ConfigurationType {
  DEV = 'DEV',
  PROD = 'PROD',
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

export function createConfiguration(opts: ConfigurationOptions): Configuration {
  const { dev } = opts

  const inputOptions: InputOptions = {
    input: paths.appEntry,
    plugins: [
      resolve(),
      commonjs(),
      json(),
      autoExternal({
        packagePath: paths.appPackageJson,
        resolveOpts: {
          paths: [paths.projectPath],
        },
      }),
      typescript({
        tsconfig: paths.appTsConfig,
      }),
      !dev && terser(),
    ].filter(Boolean) as Plugin[],
    onwarn: overrideOnWarn,
  }

  const outputOptions: OutputOptions = {
    file: dev ? paths.appDevBundle : paths.appProdBundle,
    format: 'cjs',
    sourcemap: dev ? 'inline' : true,
  }

  return dev
    ? {
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
      }
    : {
        type: ConfigurationType.PROD,
        inputOptions,
        outputOptions,
      }
}
