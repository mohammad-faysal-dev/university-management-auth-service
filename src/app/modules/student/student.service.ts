import type { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper.js'
import type { IGenericResponse } from '../../../interfaces/common.js'
import type { IPaginationOptions } from '../../../interfaces/paginations.js'
import { studentSearchableFields } from './student.constant.js'
import type { IStudent, IStudentFilters } from './student.interface.js'
import { Student } from './student.modal.js'

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IStudent[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)

  const andConditions: Record<string, unknown>[] = []

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
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
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const whereConditions = andConditions.length ? { $and: andConditions } : {}

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }

  const skip = (page - 1) * limit
  const total = await Student.countDocuments(whereConditions)
  const result = await Student.find(whereConditions)
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
const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id)
  return result
}
const updateStudent = async (
  id: string,
  payload: Partial<IStudent>,
): Promise<IStudent | null> => {
  const result = await Student.findOneAndUpdate({ id }, payload, {
    new: true,
  })
  return result
}
const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id)
  return result
}
export const StudentService = {
  getAllStudents,
  updateStudent,
  deleteStudent,
  getSingleStudent,
}
