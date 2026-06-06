import catchAsync from '../../../shared/catchAsync.js'
import sendResponse from '../../../shared/sendResponse.js'
import httpStatus from 'http-status'
import { FacultyService } from './faculty.service.js'
import { FacultyFilterableFields } from './faculty.constant.js'
import pick from '../../../shared/pick.js'
import { paginationFields } from '../../../constants/pagination.js'
const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await FacultyService.getSingleFaculty(id as string)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    data: result,
  })
})

const getAllFaculties = catchAsync(async (req, res) => {
  const filters = pick(req.query, FacultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOptions,
  )

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties retrieved successfully',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const { faculty } = req.body

  const result = await FacultyService.updateFaculty(id as string, faculty)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty updated successfully',
    data: result,
  })
})
const deleteFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await FacultyService.deleteFaculty(id as string)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  })
})

export const FacultyController = {
  getSingleFaculty,
  getAllFaculties,
  updateFaculty,
  deleteFaculty,
}
