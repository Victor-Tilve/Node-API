import { ServerError } from '../errors/server-error'
import { HttpResponse } from '../interfaces/http-interface'

/**
 * It takes in a data parameter, and returns an object with a statusCode of 200 and a body property
 * that is equal to the data parameter
 * @param {any} data - The data you want to return to the client
 */
export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

/**
 * It returns an object with a statusCode of 201 and the data passed in as the body
 * @param {any} data - The data to be returned in the response body.
 */
export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

/**
 * It takes an error and returns an HttpResponse with a status code of 400 and the error as the body
 * @param {Error} error - Error - The error object that will be returned in the response body.
 */
export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

/**
 * It returns an object with a statusCode of 500 and a body of a new ServerError instance
 * @param {Error} error - Error - The error object that was thrown
 */
export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack as string)
})
