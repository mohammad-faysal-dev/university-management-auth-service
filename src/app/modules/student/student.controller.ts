import { paginationFields } from '../../../constants/pagination.js'
import catchAsync from '../../../shared/catchAsync.js'
import pick from '../../../shared/pick.js'
import sendResponse from '../../../shared/sendResponse.js'
import { studentFilterableFields } from './student.constant.js'
import type { IStudent } from './student.interface.js'
import { StudentService } from './student.service.js'

const getAllStudents = catchAsync(async (req, res) => {
  const filters = pick(req.query, studentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  const result = await StudentService.getAllStudents(filters, paginationOptions)
  sendResponse<IStudent[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Students retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})
const getSingleStudent = catchAsync(async (req, res) => {
  const id = req.params.id as string
  const result = await StudentService.getSingleStudent(id)
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  })
})
const updateStudent = catchAsync(async (req, res) => {
  const id = req.params.id as string
  const result = await StudentService.updateStudent(id, req.body)
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'Student updated successfully',
    data: result,
  })
})

const deleteStudent = catchAsync(async (req, res) => {
  const id = req.params.id as string
  const result = await StudentService.deleteStudent(id)
  sendResponse<IStudent>(res, {
    statusCode: 200,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  })
})

export const studentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
