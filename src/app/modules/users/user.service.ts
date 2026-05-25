import config from '../../../config/index.js'
import ApiError from '../../../errors/ApiError.js'
import type { IUser } from './user.interface.js'
import { User } from './user.model.js'
import { generateStudentId } from './user.utils.js'

const createUser = async (user: IUser): Promise<IUser | null> => {
  const id = await generateStudentId()
  user.id = id

  if (!user.password) {
    user.password = config.default_user_password as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user')
  }
  return createdUser
}

export const UserService = {
  createUser,
}
