import catchAsync from '../../../shared/catchAsync.js'
import pick from '../../../shared/pick.js'
import sendResponse from '../../../shared/sendResponse.js'
import type {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface.js'
import { AcademicFacultyService } from './academicFaculty.service.js'
import { academicFacultyFilterableFields } from './academicFaculty.constant.js'

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
  const filters = pick(req.query, academicFacultyFilterableFields)

  const paginationOptions = pick(req.query, [
    'page',
    'limit',
    'sortBy',
    'sortOrder',
  ])

  const result = await AcademicFacultyService.getAllFaculties(
    filters as IAcademicFacultyFilters,
    paginationOptions,
  )

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculties retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await AcademicFacultyService.getSingleFaculty(id)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty retrieved successfully',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AcademicFacultyService.updateFaculty(id, req.body)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty updated successfully',
    data: result,
  })
})
const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await AcademicFacultyService.deleteFaculty(id)
  sendResponse<IAcademicFaculty>(res, {
    statusCode: 200,
    success: true,
    message: 'Academic Faculty deleted successfully',
    data: result,
  })
})
export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
