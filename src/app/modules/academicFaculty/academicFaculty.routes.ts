import express from 'express'
import { AcademicFacultyController } from './academicFaculty.controller.js'
const router = express.Router()

router.post('/create-faculty', AcademicFacultyController.createFaculty)
router.get('/', AcademicFacultyController.getAllFaculties)
router.get('/:id', AcademicFacultyController.getSingleFaculty)
router.patch('/:id', AcademicFacultyController.updateFaculty)
router.delete('/:id', AcademicFacultyController.deleteFaculty)
export const AcademicFacultyRoutes = router
