import express from 'express'
import { UserController } from './user.controller.js'
import { UserValidation } from './user.validation.js'
import validateRequest from '../../../middlewares/validateRequest.js'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent,
)

export const UserRoutes = router
