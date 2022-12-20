import { IatiDatastoreGetMonetaryAid } from '../../controllers/IatiDatastoreApi/getMonetaryAid-controller'
import { IatiDatastoreApiData } from '../../data/useCases/IatiDatastoreApi/IatiDatastoreApi-data'
import { IatiDatastoreApiRepository } from '../../domain/repositories/IatiDatastoreApi-repository'

export const makeGetMonetaryAidController = (): IatiDatastoreGetMonetaryAid => {
  const iatiDatastoreApiRepository = new IatiDatastoreApiRepository()
  const iatiDatastoreApiData = new IatiDatastoreApiData(iatiDatastoreApiRepository)
  const iATIDatastoreGetMonetaryAid = new IatiDatastoreGetMonetaryAid(iatiDatastoreApiData)

  return iATIDatastoreGetMonetaryAid
}
