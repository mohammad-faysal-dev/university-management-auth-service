import { Model, Types } from 'mongoose'
import type { IAcademicFaculty } from '../academicFaculty/academicFaculty.interface.js'
import type { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface.js'
import type { IAcademicSemester } from '../academicSemester/academicSemester.interface.js'

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
  profileImage?: string
  academicFaculty: Types.ObjectId | IAcademicFaculty
  academicDepartment: Types.ObjectId | IAcademicDepartment
  academicSemester: Types.ObjectId | IAcademicSemester
}

export type StudentModal = Model<IStudent, Record<string, unknown>>

export interface IStudentFilters {
  searchTerm?: string
  id?: string
  email?: string
  bloodGroup?: string
  contactNo?: string
  emergencyContactNo?: string
}
