import express from 'express'
import { FacultyController } from './faculty.controller.js'
const router = express.Router()

router.get('/', FacultyController.getAllFaculties)
router.get('/:id', FacultyController.getSingleFaculty)
router.delete('/:id', FacultyController.deleteFaculty)
router.patch('/:id', FacultyController.updateFaculty)

export const FacultyRoutes = router
