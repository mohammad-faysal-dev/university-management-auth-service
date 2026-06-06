import { Model, type Types } from 'mongoose'
import type { IManagementDepartment } from '../managementDepartment/managementDepartment.interface.js'

export interface UserName {
  firstName: string
  middleName: string
  lastName: string
}

export interface IAdmin {
  id: string
  name: UserName
  dateOfBirth: string
  designation: string
  gender: 'Male' | 'Female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  profileImage?: string
  managementDepartment: Types.ObjectId | IManagementDepartment
}

export type adminModel = Model<IAdmin, Record<string, unknown>>
