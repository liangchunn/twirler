import * as fs from 'fs'
import * as path from 'path'

const appDirectory = fs.realpathSync(process.cwd())
const useTemplate =
  appDirectory === fs.realpathSync(path.join(__dirname, '../..'))

function resolveApp(relativePath: string): string {
  return path.resolve(appDirectory, relativePath)
}

function resolveOwn(relativePath: string): string {
  return path.resolve(__dirname, '../..', relativePath)
}

export const paths = useTemplate
  ? {
      projectPath: resolveOwn('.'),
      appPackageJson: resolveOwn('package.json'),
      appEntry: resolveOwn('template/src/index.ts'),
      appTsConfig: resolveOwn('template/tsconfig.json'),
      appDevBundle: resolveOwn('template/build/bundle.js'),
      appSrc: resolveOwn('template/src'),
      appProdBundle: resolveOwn('template/dist/bundle.js'),
    }
  : {
      projectPath: resolveApp('.'),
      appPackageJson: resolveApp('package.json'),
      appEntry: resolveApp('src/index.ts'),
      appTsConfig: resolveApp('tsconfig.json'),
      appDevBundle: resolveApp('build/bundle.js'),
      appSrc: resolveApp('src'),
      appProdBundle: resolveApp('dist/bundle.js'),
    }
