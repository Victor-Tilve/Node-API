// eslint-disable-next-line n/no-deprecated-api
import { UrlWithParsedQuery, parse } from 'url'
import { InvalidArgument } from '../errors/invalid-arg'

export class UrlLogin {
  public static parseUrl (url: string): UrlWithParsedQuery | Error {
    if (!url) {
      return new InvalidArgument(url)
    }
    return parse(url, true)
  }
}
