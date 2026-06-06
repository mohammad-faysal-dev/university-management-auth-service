import { model, Schema } from 'mongoose'
import type {
  IManagementDepartment,
  managementModel,
} from './managementDepartment.interface.js'

const managementSchema = new Schema<IManagementDepartment>({
  title: {
    type: String,
  },
})

export const managementDepartment = model<
  IManagementDepartment,
  managementModel
>('management', managementSchema)
