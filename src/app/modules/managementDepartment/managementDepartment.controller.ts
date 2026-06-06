import { paginationFields } from '../../../constants/pagination.js'
import catchAsync from '../../../shared/catchAsync.js'
import pick from '../../../shared/pick.js'
import sendResponse from '../../../shared/sendResponse.js'
import { managementDepartmentFilters } from './managementDepartment.constant.js'
import type { IManagementDepartment } from './managementDepartment.interface.js'
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

const getSingleManagementDepartment = catchAsync(async (req, res) => {
  const id = req.params.id
  const result =
    await ManagementDepartmentService.getSingleManagementDepartment(id)
  sendResponse<IManagementDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Management Department retrieved Successfully',
    data: result,
  })
})
const deleteManagementDepartment = catchAsync(async (req, res) => {
  const id = req.params.id
  const result =
    await ManagementDepartmentService.deleteManagementDepartment(id)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Management Department delete Successfully',
    data: result,
  })
})
const updateManagementDepartment = catchAsync(async (req, res) => {
  const id = req.params.id
  const updatedData = req.body
  const result = ManagementDepartmentService.updateManagementDepartment(
    id,
    updatedData,
  )
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Management Department updated Successfully',
    data: result,
  })
})

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getSingleManagementDepartment,
  deleteManagementDepartment,
  updateManagementDepartment,
}
