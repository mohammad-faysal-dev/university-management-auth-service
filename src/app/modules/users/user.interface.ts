import { Model, Types } from 'mongoose'
import type { IStudent } from '../student/student.interface.js'

export interface IUser {
  id: string
  role: string
  password: string
  student?: Types.ObjectId | IStudent | undefined
}

export type UserModel = Model<IUser, Record<string, unknown>>
