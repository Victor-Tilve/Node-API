/* InvalidArgument is a class that extends Error and has a constructor that takes a string argument. */
export class InvalidArgument extends Error {
  constructor (public arg: string) {
    super(`Invalid Argument: ${arg}`)
  }
}
