/* MissingFormalParameter is a class that extends Error and has a constructor that takes a name
parameter and sets the name property to the value of the name parameter. */
export class MissingFormalParameter extends Error {
  constructor (public name: string) {
    super('Error in the Parameters')
    this.name = `Error in the Parameter: ${name}`
  }
}
/* `WrongCountryCode` is a class that extends the `Error` class and has a constructor that takes a
`name` parameter */
export class WrongCountryCode extends Error {
  constructor (public name: string) {
    super('Country Code Incorrect')
    this.name = `Country Code Incorrect: ${name}. Does not match ISO 3166 alpha-2`
  }
}
/* `WrongLoginParams` is a class that extends the `Error` class and has a constructor that takes a
`name` parameter and sets the `name` property of the class to `Your  is incorrect` */
export class WrongLoginParams extends Error {
  constructor (public name: string) {
    super('Your email or password is incorrect')
    this.name = `Your ${name} is incorrect`
  }
}
