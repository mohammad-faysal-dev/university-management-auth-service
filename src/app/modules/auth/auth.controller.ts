import config from '../../../config/index.js'
import catchAsync from '../../../shared/catchAsync.js'
import sendResponse from '../../../shared/sendResponse.js'
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface.js'
import { AuthService } from './auth.service.js'

const loginUser = catchAsync(async (req, res) => {
  const { ...loginData } = req.body
  const result = await AuthService.loginUser(loginData)
  const { refreshToken, ...others } = result
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Log in successful',
    data: others,
  })
})

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies
  const result = await AuthService.refreshToken(refreshToken)
  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  }
  res.cookie('refreshToken', refreshToken, cookieOptions)

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User Logged in successfully',
    data: result,
  })
})
export const AuthController = {
  loginUser,
  refreshToken,
}
