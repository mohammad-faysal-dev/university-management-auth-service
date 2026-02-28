import type { SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError.js'
import { paginationHelper } from '../../../helpers/paginationHelper.js'
import type { IGenericResponse } from '../../../interfaces/common.js'
import type { IPaginationOptions } from '../../../interfaces/paginations.js'
import { academicSemesterTitleCodeMapper } from './academicSemester.constant.js'
import type {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academicSemester.interface.js'
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
  filters: IAcademicSemesterFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)
  const { searchTerm, ...filtersData } = filters
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const academicSemesterSearchableFields = ['title', 'code', 'year']
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  const result = await AcademicSemester.find({ $and: andConditions })
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
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
