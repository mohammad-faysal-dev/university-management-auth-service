import type { SortOrder } from 'mongoose'
import { paginationHelper } from '../../../helpers/paginationHelper.js'
import type { IGenericResponse } from '../../../interfaces/common.js'
import type { IPaginationOptions } from '../../../interfaces/paginations.js'
import { managementDepartmentSearchableFields } from './managementDepartment.constant.js'
import type {
  IManagementDepartment,
  IManagementFilters,
} from './managementDepartment.interface.js'
import { ManagementDepartment } from './managementDepartment.modal.js'

const createManagementDepartment = async (
  payload: IManagementDepartment,
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(payload)
  return result
}
const getAllManagementDepartment = async (
  filters: IManagementFilters,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IManagementDepartment[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions)
  const andConditions = []
  if (searchTerm) {
    andConditions.push({
      $or: managementDepartmentSearchableFields.map(field => ({
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
  const total = await ManagementDepartment.countDocuments(whereConditions)
  const result = await ManagementDepartment.find(whereConditions)
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
const getSingleManagementDepartment = async (
  id: string | undefined,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id)
  return result
}
const deleteManagementDepartment = async (
  id: string | undefined,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id)
  return result
}
const updateManagementDepartment = async (
  id: string | undefined,
  payload: Partial<IManagementDepartment>,
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  )
  return result
}

export const ManagementDepartmentService = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  deleteManagementDepartment,
  updateManagementDepartment,
}
