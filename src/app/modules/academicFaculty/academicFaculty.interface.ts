import type { Model } from 'mongoose'

export interface IAcademicFaculty {
  title: string
}

export type FacultyModel = Model<IAcademicFaculty>
