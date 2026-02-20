import type { IGenericErrorMessage } from './error.js'
export interface IGenericResponse<T> {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}
export interface IGenericErrorResponse {
  statusCode: number
  message: string
  errorMessage: IGenericErrorMessage[]
}
