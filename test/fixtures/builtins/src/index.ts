import { homedir } from 'os'
import { join } from 'path'

import { safeFileRead } from './safeFileRead'

const zshrc = join(homedir(), '.zshrc')

console.log(safeFileRead(zshrc, { encoding: 'utf-8' }))
