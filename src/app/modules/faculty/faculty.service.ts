import mongoose, { type SortOrder } from 'mongoose'
import ApiError from '../../../errors/ApiError.js'
import type { TFaculty, TFacultyFilters } from './faculty.interface.js'
import { Faculty } from './faculty.model.js'
import { User } from '../users/user.model.js'
import { paginationHelper } from '../../../helpers/paginationHelper.js'
import type { IPaginationOptions } from '../../../interfaces/paginations.js'
import type { IGenericResponse } from '../../../interfaces/common.js'
import { FacultySearchableFields } from './faculty.constant.js'

const getAllFaculties = async (
  filters: TFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<TFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters
  const { page, limit, sortBy, sortOrder } = paginationHelper.calculatePagination(paginationOptions)

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: FacultySearchableFields.map(field => ({
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
  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)

  const total = await Faculty.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}
const getSingleFaculty = async (id: string) => {
  const result = await Faculty.findById(id).populate('academicDepartment')
  return result
}
const updateFaculty = async (id: string, payload: Partial<TFaculty>): Promise<TFaculty | null> => {
  const isExist = await Faculty.findOne({ id })
  if (!isExist) {
    throw new ApiError(400, 'Faculty not found')
  }
  const { name, ...remainingFacultyData } = payload
  const updateFacultyData: Partial<TFaculty> = { ...remainingFacultyData }
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      ;(updateFacultyData as any)[nameKey] = name[key as keyof typeof name]
    })
  }
  const result = await Faculty.findOneAndUpdate({ id }, updateFacultyData, {
    new: true,
  })
  return result
}
const deleteFaculty = async (id: string) => {
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deleteFaculty = await Faculty.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session }
    )
    if (!deleteFaculty) {
      throw new ApiError(400, 'Failed to delete faculty')
    }
    const userId = deleteFaculty.user
    const deleteUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session }
    )
    if (!deleteUser) {
      throw new ApiError(400, 'Failed to delete user')
    }
    await session.commitTransaction()
    await session.endSession()
    return deleteFaculty
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}
export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
}
