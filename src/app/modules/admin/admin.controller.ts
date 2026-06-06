import catchAsync from '../../../shared/catchAsync.js'
import sendResponse from '../../../shared/sendResponse.js'
import { AdminService } from './admin.service.js'

const getSingleAdmin = catchAsync(async (req, res) => {
  const id = req.params.id as string
  const result = await AdminService.getSingleAdmin(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  })
})
const updateAdmin = catchAsync(async (req, res) => {
  const id = req.params.id as string
  const updateData = req.body
  const result = await AdminService.updateAdmin(id, updateData)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  })
})
const deleteAdmin = catchAsync(async (req, res) => {
  const id = req.params.id as string
  const result = await AdminService.deleteAdmin(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  })
})

export const AdminController = {
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
