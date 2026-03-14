import catchAsync from '../../../shared/catchAsync.js'
import sendResponse from '../../../shared/sendResponse.js'
import type { IAcademicFaculty } from './academicFaculty.interface.js'
import { AcademicFacultyService } from './academicFaculty.service.js'

const createFaculty = catchAsync(async (req, res) => {
  const { ...academicFacultyData } = req.body

  const result = await AcademicFacultyService.createFaculty(academicFacultyData)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty created successfully',
    data: result,
  })
})
const getAllFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getAllFaculties()
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculties retrieved successfully',
    data: result,
  })
})

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
}
