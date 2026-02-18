import { AcademicSemesterService } from './academicSemester.service.js'
import catchAsync from '../../../shared/catchAsync.js'
import sendResponse from '../../../shared/sendResponse.js'
import httpStatus from 'http-status'
import type { NextFunction, Request, Response } from 'express'

const createSemester = catchAsync(async (req, res, next) => {
  const { ...academicSemesterData } = req.body
  const result =
    await AcademicSemesterService.createSemester(academicSemesterData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semester created successfully',
    data: result,
  })
  next()
})
const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const paginationOptions = {
      page: Number(req.query.page),
      limit: Number(req.query.limit),
      sortBy: req.query.sortBy,
      sortOrder: req.query.sortOrder,
    }
    const result =
      await AcademicSemesterService.getAllSemesters(paginationOptions)
    sendResponse(res, {
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
}
