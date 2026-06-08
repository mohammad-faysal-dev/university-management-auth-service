import express from 'express'
import validateRequest from '../../../middlewares/validateRequest.js'
import { AuthValidation } from './auth.validation.js'

const router = express.Router()

router.post('/login', validateRequest(AuthValidation.loginZodSchema))

export const AuthRoute = router
