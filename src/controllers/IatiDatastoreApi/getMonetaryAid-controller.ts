import { IIatiDatastoreApiData } from '../../domain/useCases/IATIDatastoreApi/IatiDatastoreApi-interface'
import { MissingFormalParameter } from '../../errors/client-error'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest, HttpResponse } from '../../interfaces/http-interface'

export class IatiDatastoreGetMonetaryAid implements Controller {
  constructor (private readonly dataIATIDatastoreApi: IIatiDatastoreApiData) {
    this.dataIATIDatastoreApi = dataIATIDatastoreApi
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    // console.log('IatiDatastoreGetMonetaryAid: inside')
    // console.log('IatiDatastoreGetMonetaryAid::httpRequest: ' + JSON.stringify(httpRequest))
    // console.log('IatiDatastoreGetMonetaryAid::httpRequest.body: ' + JSON.stringify(httpRequest.body))
    try {
      const requiredProperties = ['countryCode']

      for (const prop of requiredProperties) {
        if (httpRequest.body[prop] === undefined) {
          return badRequest(new MissingFormalParameter(prop))
        }
      }
      const { countryCode } = httpRequest.body
      const monetaryAidResponse = await this.dataIATIDatastoreApi.getMonetaryAid(countryCode)
      return success(monetaryAidResponse)
    } catch (error) {
      return serverError(error)
    }
  }
}
