import type mongoose from 'mongoose'
import type { IGenericErrorMessage } from '../interfaces/error.js'

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid ID',
    },
  ]
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation Error',
    errorMessage: errors,
  }
}
export default handleCastError
