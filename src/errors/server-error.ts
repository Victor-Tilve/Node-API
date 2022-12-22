/* It's a class that extends the Error class and has a constructor that takes a stack trace as an
argument */
export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal Server Error')
    this.name = 'Internal Server Error'
    this.stack = stack
  }
}
