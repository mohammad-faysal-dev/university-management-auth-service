import type { Model } from 'mongoose'

export type IAcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'

export type AcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall'
export type AcademicSemesterCode = '01' | '02' | '03'
export interface IAcademicSemester {
  title: AcademicSemesterTitles
  year: string
  code: AcademicSemesterCode
  startMonth: IAcademicSemesterMonths
  endMonth: IAcademicSemesterMonths
}

export type AcademicSemesterModel = Model<IAcademicSemester>

export interface IAcademicSemesterFilters {
  searchTerm?: string
}
