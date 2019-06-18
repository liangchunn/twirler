import { RollupWatchOptions, InputOptions, OutputOptions } from 'rollup'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import autoExternal from '@liangchun/rollup-plugin-auto-external'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'
import json from 'rollup-plugin-json'

import { paths } from './paths'
import { overrideOnWarn } from '../util/overrides'

export function createWatchConfiguration(): RollupWatchOptions {
  return {
    input: paths.appEntry,
    output: {
      file: paths.appDevBundle,
      format: 'cjs',
      sourcemap: 'inline',
    },
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
    ],
    watch: {
      /**
       * TODO: switch to true once rollup can correctly resolve `chokidar`
       * https://github.com/rollup/rollup/issues/2934
       */
      chokidar: false,
    },
    onwarn: overrideOnWarn,
  }
}

export function createBuildConfiguration() {
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
      terser(),
    ],
    onwarn: overrideOnWarn,
  }
  const outputOptions: OutputOptions = {
    file: paths.appProdBundle,
    format: 'cjs',
    sourcemap: true,
  }
  return {
    inputOptions,
    outputOptions,
  }
}
