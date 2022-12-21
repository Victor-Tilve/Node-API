import { Request, Response } from 'express'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest } from '../../interfaces/http-interface'

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
