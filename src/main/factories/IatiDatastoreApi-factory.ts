import { IatiDatastoreGetMonetaryAidLast5YearsController } from '../../controllers/IatiDatastoreApi/getMonetaryAidLast5Years-controller'
import { IatiDatastoreApiData } from '../../data/useCases/IatiDatastoreApi/IatiDatastoreApi-data'
import { IatiDatastoreApiRepository } from '../../domain/repositories/IatiDatastoreApi-repository'

export const makeGetMonetaryAidController = (): IatiDatastoreGetMonetaryAidLast5YearsController => {
  const iatiDatastoreApiRepository = new IatiDatastoreApiRepository()
  const iatiDatastoreApiData = new IatiDatastoreApiData(iatiDatastoreApiRepository)
  const iATIDatastoreGetMonetaryAid = new IatiDatastoreGetMonetaryAidLast5YearsController(iatiDatastoreApiData)

  return iATIDatastoreGetMonetaryAid
}
