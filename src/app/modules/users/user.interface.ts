import { Model, Types } from 'mongoose'
import type { IStudent } from '../student/student.interface.js'
import type { TFaculty } from '../faculty/faculty.interface.js'
import type { IAdmin } from '../admin/admin.interface.js'

export interface IUser {
  id: string
  role: string
  password: string
  needsPasswordChange: boolean
  student?: Types.ObjectId | IStudent | undefined
  faculty?: Types.ObjectId | TFaculty | undefined
  admin?: Types.ObjectId | IAdmin | undefined
}
export interface IUserMethods {
  isUserExist(id: string): Promise<Partial<IUser> | null>
  isPasswordMatched(givenPassword: string, savedPassword: string): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>
