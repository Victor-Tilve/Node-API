import { pool } from '../../infra/db/postgreslq/postgresql-connect'
import { HttpResponse } from '../../interfaces/http-interface'
import { IBaseUserInput, IDatabaseRepository } from '../../interfaces/user-interface'

export class DatabaseRepository implements IDatabaseRepository {
  async createUser (newUser: IBaseUserInput): Promise<HttpResponse> {
    const { userName, hashPassword, email } = newUser
    try {
      // eslint-disable-next-line no-multi-str, @typescript-eslint/no-unused-vars
      const response = await pool.query('\
      INSERT INTO users(userName, password, email)\
      VALUES ($1,$2,$3);\
      ', [userName, hashPassword, email])
    } catch (error) {
      console.log('DatabaseRepository::createUser::queryResponse::Error: ' + JSON.stringify(Error))
      return {
        statusCode: 404,
        body: 'There was an error'
      }
    }
    return {
      statusCode: 201,
      body: `User ${newUser.userName} was created`
    }
  }
}
