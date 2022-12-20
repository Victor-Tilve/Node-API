import { IIatiDatastoreApiData } from '../../domain/useCases/IATIDatastoreApi/IatiDatastoreApi-interface'
import { MissingFormalParameter, WrongCountryCode } from '../../errors/client-error'
import { badRequest, serverError, success } from '../../helpers/http-helper'
import { IsoAlpha2 } from '../../helpers/ISO3166Alpha2-helper'
import { Controller } from '../../interfaces/controller-interface'
import { HttpRequest, HttpResponse } from '../../interfaces/http-interface'
export class IatiDatastoreGetMonetaryAidLast5YearsController implements Controller {
  constructor (private readonly dataIATIDatastoreApi: IIatiDatastoreApiData) {
    this.dataIATIDatastoreApi = dataIATIDatastoreApi
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredProperties = ['countryCode']
    for (const prop of requiredProperties) {
      if (httpRequest.params[prop] === undefined) {
        return badRequest(new MissingFormalParameter(prop))
      }
    }
    const { countryCode } = httpRequest.params

    if (IsoAlpha2[countryCode] !== undefined) {
      try {
        const monetaryAidResponse = await this.dataIATIDatastoreApi.getMonetaryAidLast5Years(countryCode)
        return success(monetaryAidResponse)
      } catch (error) {
        return serverError(error)
      }
    } else {
      return badRequest(new WrongCountryCode(countryCode))
    }
  }
}
