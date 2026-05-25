import { UserService } from './user.service.js'
import catchAsync from '../../../shared/catchAsync.js'
import sendResponse from '../../../shared/sendResponse.js'
import httpStatus from 'http-status'
import type { IUser } from './user.interface.js'

const createUser = catchAsync(async (req, res) => {
  const { ...userData } = req.body
  const result = await UserService.createUser(userData)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully',
    data: result,
  })
})

export const UserController = {
  createUser,
}
