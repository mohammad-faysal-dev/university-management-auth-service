import { Model, Types } from 'mongoose'
import type { IStudent } from '../student/student.interface.js'
import type { TFaculty } from '../faculty/faculty.interface.js'

export interface IUser {
  id: string
  role: string
  password: string
  student?: Types.ObjectId | IStudent | undefined
  faculty?: Types.ObjectId | TFaculty | undefined
  admin?: Types.ObjectId
}

export type UserModel = Model<IUser, Record<string, unknown>>
