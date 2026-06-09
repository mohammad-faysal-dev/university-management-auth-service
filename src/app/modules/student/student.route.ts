import express from 'express'
import { studentController } from './student.controller.js'
import validateRequest from '../../../middlewares/validateRequest.js'
import { StudentValidation } from './student.validation.js'
const router = express.Router()

router.get('/', studentController.getAllStudents)
router.get('/:id', studentController.getSingleStudent)
router.delete('/:id', studentController.deleteStudent)
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  studentController.updateStudent
)

export const StudentRoutes = router
