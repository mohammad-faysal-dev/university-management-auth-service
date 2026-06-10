import express from 'express'
import validateRequest from '../../../middlewares/validateRequest.js'
import { AuthValidation } from './auth.validation.js'
import { AuthController } from './auth.controller.js'

const router = express.Router()

router.post('/login', validateRequest(AuthValidation.loginZodSchema), AuthController.loginUser)
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
)

export const AuthRoute = router
