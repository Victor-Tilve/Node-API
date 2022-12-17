import { Request, Response } from 'express'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest } from '../../interfaces/http-interface'

// COMEBACK: WHy I'm user the adapter
export const AdapterRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    // FIXME: I don't like how i'm handling the params
    const httpRequest: HttpRequest = {
      body: req.params
    }
    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
