import type { Model } from 'mongoose'

export interface IManagementDepartment {
  title: string
}

export type managementModel = Model<IManagementDepartment>
