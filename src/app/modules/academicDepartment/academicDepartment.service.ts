import { academicDepartmentSearchableFields } from './academicDepartment.constants.js'
import type {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface.js'
import { AcademicDepartment } from './academicDepartment.model.js'

const createDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = await AcademicDepartment.create(payload)
  return result
}
const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
): Promise<IAcademicDepartment[]> => {
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
  const result = await AcademicDepartment.find({ $and: andConditions })
  return result
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
