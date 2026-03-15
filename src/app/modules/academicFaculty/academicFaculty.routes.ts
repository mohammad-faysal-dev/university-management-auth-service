import express from 'express'
import { AcademicFacultyController } from './academicFaculty.controller.js'
const router = express.Router()

router.post('/create-faculty', AcademicFacultyController.createFaculty)
router.get('/', AcademicFacultyController.getAllFaculties)

export const AcademicFacultyRoutes = router
