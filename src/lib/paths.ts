import { realpathSync } from 'fs-extra'
import { resolve, join } from 'path'

const appDirectory = realpathSync(process.cwd())
const useTemplate = appDirectory === realpathSync(join(__dirname, '../..'))

function resolveApp(relativePath: string): string {
  return resolve(appDirectory, relativePath)
}

function resolveOwn(relativePath: string): string {
  return resolve(__dirname, '../..', relativePath)
}

export const paths = useTemplate
  ? {
      projectPath: resolveOwn('.'),
      appPackageJson: resolveOwn('package.json'),
      appEntry: resolveOwn('template/src/index.ts'),
      appTsConfig: resolveOwn('template/tsconfig.json'),
      appDevBundle: resolveOwn('template/build/bundle.js'),
      appSrc: resolveOwn('template/src'),
      appProdBundle: resolveOwn('template/build/bundle.prod.js'),
    }
  : {
      projectPath: resolveApp('.'),
      appPackageJson: resolveApp('package.json'),
      appEntry: resolveApp('src/index.ts'),
      appTsConfig: resolveApp('tsconfig.json'),
      appDevBundle: resolveApp('build/bundle.js'),
      appSrc: resolveApp('src'),
      appProdBundle: resolveApp('build/bundle.prod.js'),
    }
