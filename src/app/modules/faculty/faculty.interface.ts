import { Model, Types } from 'mongoose'

export type TGender = 'male' | 'female' | 'other'
export type TBloodGroup = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export interface TUserName {
  firstName: string
  middleName: string
  lastName: string
}

export interface TFaculty {
  id: string
  designation: string
  name: TUserName
  gender: TGender
  dateOfBirth?: Date
  email: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup?: TBloodGroup
  presentAddress: string
  permanentAddress: string
  profileImg?: string
  academicDepartment: Types.ObjectId
  isDeleted: boolean
}

export interface FacultyModel extends Model<TFaculty> {
  isUserExists(id: string): Promise<TFaculty | null>
}

export interface TFacultyFilters {
  searchTerm?: string
  email?: string
  contactNo?: string
  emergencyContactNo?: string
}
