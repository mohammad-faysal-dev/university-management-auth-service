import catchAsync from '../../../shared/catchAsync.js'
import sendResponse from '../../../shared/sendResponse.js'
import type { IAcademicDepartment } from './academicDepartment.interface.js'
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

export const AcademicDepartmentController = {
  createDepartment,
}
