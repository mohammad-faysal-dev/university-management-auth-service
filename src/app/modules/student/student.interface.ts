import { Model, Types } from 'mongoose'

export interface UserName {
  firstName: string
  middleName?: string
  lastName: string
}

export interface Guardian {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
  address: string
}

export interface LocalGuardian {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export interface IStudent {
  id: string
  name: UserName
  dateOfBirth: string
  gender: 'male' | 'female'
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  email: string
  contactNo: string
  emergencyContactNo: string
  presentAddress: string
  permanentAddress: string
  guardian: Guardian
  localGuardian: LocalGuardian
  profileImage: string
  academicFaculty: Types.ObjectId
  academicDepartment: Types.ObjectId
  academicSemester: Types.ObjectId
}

export type StudentModal = Model<IStudent, Record<string, unknown>>
