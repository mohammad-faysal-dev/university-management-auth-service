/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose'
import type { IUser, UserModel } from './user.interface.js'
import config from '../../../config/index.js'
import bcrypt from 'bcrypt'
const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
  },
  {
    timestamps: true,
  }
)
userSchema.pre('save', async function () {
  const user = this
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
})

export const User = model<IUser, UserModel>('User', userSchema)
