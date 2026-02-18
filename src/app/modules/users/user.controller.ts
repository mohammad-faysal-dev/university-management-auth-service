import { UserService } from './user.service.js'
import catchAsync from '../../../shared/catchAsync.js'
import sendResponse from '../../../shared/sendResponse.js'
import httpStatus from 'http-status'

const createUser = catchAsync(async (req, res, next) => {
  const { user } = req.body
  const result = await UserService.createUser(user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
  next()
})

export const UserController = {
  createUser,
}
