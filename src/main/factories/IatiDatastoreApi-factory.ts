import { IatiDatastoreGetMonetaryAid } from '../../controllers/IatiDatastoreApi/getMonetaryAid-controller'
import { IatiDatastoreApiData } from '../../data/useCases/IatiDatastoreApi/IatiDatastoreApi-data'

export const makeGetMonetaryAidController = (): IatiDatastoreGetMonetaryAid => {
  const iatiDatastoreApiData = new IatiDatastoreApiData()
  const iATIDatastoreGetMonetaryAid = new IatiDatastoreGetMonetaryAid(iatiDatastoreApiData)

  return iATIDatastoreGetMonetaryAid
}
