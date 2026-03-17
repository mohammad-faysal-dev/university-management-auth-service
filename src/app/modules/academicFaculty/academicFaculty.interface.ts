import type { Model } from 'mongoose'

export interface IAcademicFaculty {
  title: string
}

export interface IAcademicFacultyFilters {
  searchTerm?: string
  title?: string
}

export type FacultyModel = Model<IAcademicFaculty>
