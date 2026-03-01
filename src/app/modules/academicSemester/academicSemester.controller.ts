import { AcademicSemesterService } from './academicSemester.service.js'
import catchAsync from '../../../shared/catchAsync.js'
import sendResponse from '../../../shared/sendResponse.js'
import httpStatus from 'http-status'
import type { NextFunction, Request, Response } from 'express'
import pick from '../../../shared/pick.js'
import type { IAcademicSemester } from './academicSemester.interface.js'

const createSemester = catchAsync(async (req, res, next) => {
  const { ...academicSemesterData } = req.body
  const result =
    await AcademicSemesterService.createSemester(academicSemesterData)

  sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  })
  next()
})
const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, ['searchTerm', 'title', 'code', 'year'])
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
    ])
    const result = await AcademicSemesterService.getAllSemesters(
      filters,
      paginationOptions,
    )
    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semesters retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
    next()
  },
)
const getSingleSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id
    const result = await AcademicSemesterService.getSingleSemester(id)
    sendResponse<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semesters retrieved successfully',
      data: result,
    })
    next()
  },
)

export const AcademicSemesterController = {
  createSemester,
  getAllSemesters,
  getSingleSemester,
}
