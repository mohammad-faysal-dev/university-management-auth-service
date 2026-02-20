import ApiError from '../../../errors/ApiError.js'
import { paginationHelper } from '../../../helpers/paginationHelper.js'
import type { IGenericResponse } from '../../../interfaces/common.js'
import type { IPaginationOptions } from '../../../interfaces/paginations.js'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant.js'
import type { IAcademicSemester } from './academicSemester.interface.js'
import { AcademicSemester } from './academicSemesterModel.js'
import httpStatus from 'http-status'
const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester code')
  }
  const result = await AcademicSemester.create(payload)
  return result
}

const getAllSemesters = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip } =
    paginationHelper.calculatePagination(paginationOptions)
  const result = await AcademicSemester.find().sort().skip(skip).limit(limit)
  const total = await AcademicSemester.countDocuments()
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
}
