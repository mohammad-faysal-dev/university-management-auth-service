import type { IAcademicDepartment } from './academicDepartment.interface.js'
import { AcademicDepartment } from './academicDepartment.model.js'

const createDepartment = async (
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment> => {
  const result = await AcademicDepartment.create(payload)
  return result
}
const getAllDepartments = async (): Promise<IAcademicDepartment[]> => {
  const result = await AcademicDepartment.find()
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
