import config from '../../../config/index.js'
import ApiError from '../../../errors/ApiError.js'
import { jwtHelpers } from '../../../helpers/jwtHelpers.js'
import { User } from '../users/user.model.js'
import { ILoginUser, ILoginUserResponse } from './auth.interface.js'
import httpStatus from 'http-status'
import jwt, { Secret } from 'jsonwebtoken'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload
  const user = new User()
  const isUserExist = await user.isUserExist(id)
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }
  if (user.password && !user.isPasswordMatched(password, user.password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }
  //create access token and refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )
  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  }
}
// const refreshToken = async (token: string) => {
//   let verifyToken = null
//   try {
//     verifyToken = jwt.verify(token, config.jwt.refresh_secret as Secret)
//   } catch (err) {
//     throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token')
//   }
//   const { userId, role } = verifyToken
//   const isUserExist = await User.isUserExist(userId)
//   if (!isUserExist) {
//     throw new ApiError(httpStatus.NOT_FOUND, 'User not found')

//   }
// }

export const AuthService = {
  loginUser,
}
