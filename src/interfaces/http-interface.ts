export interface HttpResponse {
  statusCode: number
  body: any
}
// FIXME: add params to the  HttpRequest
export interface HttpRequest {
  body?: any
  params?: any
}
