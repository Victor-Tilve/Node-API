export class ServerError extends Error {
  constructor (stack: string) {
    super('Error internal the server')
    this.name = 'Error internal the server'
    this.stack = stack
  }
}
