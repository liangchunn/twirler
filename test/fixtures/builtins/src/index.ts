import * as os from 'os'
import * as path from 'path'

import { safeFileRead } from './safeFileRead'

const zshrc = path.join(os.homedir(), '.zshrc')

console.log(safeFileRead(zshrc, { encoding: 'utf-8' }))
