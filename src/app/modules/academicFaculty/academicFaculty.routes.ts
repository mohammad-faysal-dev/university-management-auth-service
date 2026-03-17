import express from 'express'
import { AcademicFacultyController } from './academicFaculty.controller.js'
import validateRequest from '../../../middlewares/validateRequest.js'
import { AcademicFacultyValidation } from './academicFaculty.validation.js'
const router = express.Router()

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createFacultyZodSchema),
  AcademicFacultyController.createFaculty,
)
router.get('/', AcademicFacultyController.getAllFaculties)
router.get('/:id', AcademicFacultyController.getSingleFaculty)
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidation.updateFacultyZodSchema),
  AcademicFacultyController.updateFaculty,
)
router.delete('/:id', AcademicFacultyController.deleteFaculty)
export const AcademicFacultyRoutes = router
