import { HttpResponse, HttpRequest } from './http-interface'

/* Defining the interface for the Controller class. */
export interface Controller {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
