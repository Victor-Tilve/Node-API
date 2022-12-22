/* Defining the shape of the object that will be returned from the function. */
export interface HttpResponse {
  statusCode: number
  body: any
}
/* Defining the shape of the object that will be returned from the function. */
export interface HttpRequest {
  body?: any
  params?: any
}
