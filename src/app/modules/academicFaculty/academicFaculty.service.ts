import type { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper.js'
import type { IPaginationOptions } from '../../../interfaces/paginations.js'
import type { IAcademicFaculty } from './academicFaculty.interface.js'
import { AcademicFaculty } from './academicFaculty.model.js'
import type { IGenericResponse } from '../../../interfaces/common.js'

const createFaculty = async (
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload)
  return result
}

const getAllFaculties = async (
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { page, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)
  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const skip = (page - 1) * limit
  const total = await AcademicFaculty.countDocuments()
  const result = await AcademicFaculty.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingleFaculty = async (
  id: string | undefined,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id)
  return result
}

const updateFaculty = async (
  id: string | undefined,
  payload: Partial<IAcademicFaculty>,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  })
  return result
}
const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id)
  return result
}

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
