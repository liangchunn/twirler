const isTTY = process.stdout.isTTY
const isCI = process.env.CI

export function clearConsole() {
  if (isTTY && !isCI) {
    process.stdout.write(
      process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
    )
  }
}
