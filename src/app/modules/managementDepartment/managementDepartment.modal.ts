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

export const ManagementDepartment = model<
  IManagementDepartment,
  managementModel
>('ManagementDepartment', managementSchema)
