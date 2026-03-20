import type { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper.js'
import type { IPaginationOptions } from '../../../interfaces/paginations.js'
import { academicDepartmentSearchableFields } from './academicDepartment.constants.js'
import type {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface.js'
import { AcademicDepartment } from './academicDepartment.model.js'
import type { IGenericResponse } from '../../../interfaces/common.js'

const createDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = await AcademicDepartment.create(payload)
  return result
}
const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { page, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)
  const { searchTerm, ...filtersData } = filters
  const andConditions: Record<string, unknown>[] = []
  if (searchTerm) {
    andConditions.push({
      $or: academicDepartmentSearchableFields.map(field => ({
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
  const whereConditions = andConditions.length ? { $and: andConditions } : {}

  const sortConditions: { [key: string]: SortOrder } = {}
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder
  }
  const skip = (page - 1) * limit
  const total = await AcademicDepartment.countDocuments(whereConditions)
  const result = await AcademicDepartment.find(whereConditions)
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

const updateDepartment = async (
  id: string | undefined,
  payload: Partial<IAcademicDepartment>,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    { new: true },
  )
  return result
}

const deleteDepartment = async (
  id: string | undefined,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id)
  return result
}

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartments,
  updateDepartment,
  deleteDepartment,
}
