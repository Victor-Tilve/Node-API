import { Request, Response } from 'express'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest } from '../../interfaces/http-interface'

/**
 * It takes a controller and returns a function that takes a request and a response and returns a
 * promise that resolves to a response
 * @param {Controller} controller - Controller - This is the controller that will handle the request.
 * @returns A function that takes a controller and returns a function that takes a request and a
 * response.
 */
export const AdapterRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      params: req.params,
      body: req.body
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
