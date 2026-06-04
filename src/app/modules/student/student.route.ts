import express from 'express'
import { studentController } from './student.controller.js'
const router = express.Router()

router.get('/', studentController.getAllStudents)
router.get('/:id', studentController.getSingleStudent)
router.put('/:id', studentController.updateStudent)
router.delete('/:id', studentController.deleteStudent)

export const StudentRoutes = router
