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

export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartments,
}
