import type { ErrorRequestHandler } from 'express'
import config from '../config/index.js'
import type { IGenericErrorMessage } from '../interfaces/error.js'
import handleValidationError from '../errors/handleValidationerror.js'
import ApiError from '../errors/ApiError.js'
import { errorLogger } from '../shared/logger.js'
import { ZodError } from 'zod'
import handleZodError from '../errors/handleZodError.js'
import handleCastError from '../errors/handleCastError.js'

const globalErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (config.env === 'development') {
    console.log('GlobalErrorHandler ~ ', err)
  } else {
    errorLogger.error('GlobalErrorHandler ~ ', err)
  }

  let statusCode = 500
  let message = 'Something went wrong'
  let errorMessages: IGenericErrorMessage[] = []

  if (err?.name === 'validationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessage
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessage
  } else if (err?.name == 'CastError') {
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessage
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode
    message = err.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack:
      config.env !== 'production' && err instanceof Error
        ? err?.stack
        : undefined,
  })
}

export default globalErrorHandler
