import type { Model, Types } from 'mongoose'
import type { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface.js'

export interface IAcademicDepartment {
  title: string
  academicFaculty: Types.ObjectId | IAcademicFaculty
}

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>

export interface IAcademicDepartmentFilterRequest {
  searchTerm?: string
  academicFaculty?: Types.ObjectId
}

export interface IAcademicDepartmentFilters {
  searchTerm?: string
  title?: string
}
