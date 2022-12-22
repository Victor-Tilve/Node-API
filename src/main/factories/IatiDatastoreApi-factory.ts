import { IatiDatastoreGetMonetaryAidLast5YearsController } from '../../controllers/IatiDatastoreApi/getMonetaryAidLast5Years-controller'
import { IatiDatastoreApiData } from '../../data/useCases/IatiDatastoreApi/IatiDatastoreApi-data'
import { IatiDatastoreApiRepository } from '../../domain/repositories/IatiDatastoreApi-repository'

/**
 * It creates a new instance of the IatiDatastoreGetMonetaryAidLast5YearsController class, which is a
 * controller class that is responsible for handling the request and response of the
 * getMonetaryAidLast5Years endpoint
 * @returns A function that returns an instance of IatiDatastoreGetMonetaryAidLast5YearsController
 */
export const makeGetMonetaryAidController = (): IatiDatastoreGetMonetaryAidLast5YearsController => {
  const iatiDatastoreApiRepository = new IatiDatastoreApiRepository()
  const iatiDatastoreApiData = new IatiDatastoreApiData(iatiDatastoreApiRepository)
  const iATIDatastoreGetMonetaryAid = new IatiDatastoreGetMonetaryAidLast5YearsController(iatiDatastoreApiData)

  return iATIDatastoreGetMonetaryAid
}
