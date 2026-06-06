import { paginationFields } from '../../../constants/pagination.js'
import catchAsync from '../../../shared/catchAsync.js'
import pick from '../../../shared/pick.js'
import sendResponse from '../../../shared/sendResponse.js'
import { managementDepartmentFilters } from './managementDepartment.constant.js'
import { ManagementDepartmentService } from './managementDepartment.service.js'

const createManagementDepartment = catchAsync(async (req, res) => {
  const { ...managementDepartmentData } = req.body
  const result = await ManagementDepartmentService.createManagementDepartment(
    managementDepartmentData,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Management Department created successfully',
    data: result,
  })
})
const getAllManagementDepartments = catchAsync(async (req, res) => {
  const filters = pick(req.query, managementDepartmentFilters)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await ManagementDepartmentService.getAllManagementDepartment(
    filters,
    paginationOptions,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Management Department retrieved Successfully',
    data: result,
  })
})

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
}
