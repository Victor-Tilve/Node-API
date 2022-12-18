export class MissingFormalParameter extends Error {
  constructor (public name: string) {
    super('Error in the Parameters')
    this.name = `Error in the Parameter: ${name}`
  }
}
export class WrongCountryCode extends Error {
  constructor (public name: string) {
    super('Country Code Incorrect')
    this.name = `Country Code Incorrect: ${name}. Does not match ISO 3166 alpha-2`
  }
}
