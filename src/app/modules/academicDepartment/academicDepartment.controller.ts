import catchAsync from '../../../shared/catchAsync.js'
import pick from '../../../shared/pick.js'
import sendResponse from '../../../shared/sendResponse.js'
import { academicDepartmentFilterableFields } from './academicDepartment.constants.js'
import type {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface.js'
import { AcademicDepartmentService } from './academicDepartment.service.js'

const createDepartment = catchAsync(async (req, res) => {
  const { ...academicDepartments } = req.body
  const result =
    await AcademicDepartmentService.createDepartment(academicDepartments)
  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  })
})
const getAllDepartments = catchAsync(async (req, res) => {
  const filters = pick(req.query, academicDepartmentFilterableFields)
  const result = await AcademicDepartmentService.getAllDepartments(
    filters as IAcademicDepartmentFilters,
  )
  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Departments retrieved successfully',
    data: result,
  })
})

const updateDepartment = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AcademicDepartmentService.updateDepartment(id, req.body)
  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  })
})
const deleteDepartment = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AcademicDepartmentService.deleteDepartment(id)
  sendResponse<IAcademicDepartment>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Department deleted successfully',
    data: result,
  })
})

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
}
