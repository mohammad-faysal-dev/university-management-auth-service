import type { IAcademicFaculty } from './academicFaculty.interface.js'
import { AcademicFaculty } from './academicFaculty.model.js'

const createFaculty = async (
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload)
  return result
}

const getAllFaculties = async (): Promise<IAcademicFaculty[]> => {
  const result = await AcademicFaculty.find()
  return result
}

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
}
