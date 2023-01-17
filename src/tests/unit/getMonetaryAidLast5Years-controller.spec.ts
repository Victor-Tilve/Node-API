import httpMocks from 'node-mocks-http'
import { requestCountryCode } from '../mock-data/countryCode'
import { IatiDatastoreApiData } from '../../data/useCases/IatiDatastoreApi/IatiDatastoreApi-data'
import { last5YearTransactionFormattedResponseCO } from '../mock-data/last5YearsTransaction.FormattedResponse'
import { makeGetMonetaryAidController } from '../../main/factories/IatiDatastoreApi-factory'
import { success } from '../../helpers/http-helper'
jest.mock('../../data/useCases/IatiDatastoreApi/IatiDatastoreApi-data')
const mockIatiDatastoreApiData = jest.mocked(IatiDatastoreApiData)

let httpRequest = httpMocks.createRequest()

beforeEach(() => {
  httpRequest = httpMocks.createRequest()
  mockIatiDatastoreApiData.mockClear()
})

describe('IatiDatastoreGetMonetaryAidLast5YearsController class', () => {
  test('Should handle the Last 5 years transaction request', async () => {
    httpRequest.params = requestCountryCode
    const iATIDatastoreGetMonetaryAid = makeGetMonetaryAidController()

    const mockIatiDatastoreApiDataInstance = mockIatiDatastoreApiData.mock.instances[0]
    const mockGetMonetaryAidLast5Years = mockIatiDatastoreApiDataInstance.getMonetaryAidLast5Years as jest.Mock
    mockGetMonetaryAidLast5Years.mockReturnValueOnce(Promise.resolve(last5YearTransactionFormattedResponseCO))

    const HttpResponse = await iATIDatastoreGetMonetaryAid.handle(httpRequest)
    expect(HttpResponse).toEqual(success(last5YearTransactionFormattedResponseCO))
  })
})
