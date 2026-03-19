import express from 'express'
import { AcademicDepartmentController } from './academicDepartment.controller.js'
import validateRequest from '../../../middlewares/validateRequest.js'
import { AcademicDepartmentValidation } from './academicDepartment.validation.js'
const router = express.Router()

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.createDepartment,
)
router.get('/', AcademicDepartmentController.getAllDepartments)
export const AcademicDepartmentRoutes = router
