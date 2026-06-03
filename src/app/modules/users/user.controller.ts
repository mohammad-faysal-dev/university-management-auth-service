import { UserService } from './user.service.js'
import catchAsync from '../../../shared/catchAsync.js'
import sendResponse from '../../../shared/sendResponse.js'
import httpStatus from 'http-status'
import type { IUser } from './user.interface.js'

const createStudent = catchAsync(async (req, res) => {
  const { student, ...userData } = req.body
  const result = await UserService.createStudent(student, userData)
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  })
})

export const UserController = {
  createStudent,
}
