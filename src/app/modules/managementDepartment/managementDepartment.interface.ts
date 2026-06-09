import type { Model } from 'mongoose'

export interface IManagementDepartment {
  title: string
}
export interface IManagementFilters {
  searchTerm?: string
  title?: string
}

export type managementModel = Model<IManagementDepartment, Record<string, unknown>>
