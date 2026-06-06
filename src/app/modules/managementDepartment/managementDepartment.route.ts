import express from 'express'
import { ManagementDepartmentController } from './managementDepartment.controller.js'
const router = express.Router()

router.post(
  '/create-management',
  ManagementDepartmentController.createManagementDepartment,
)
router.get('/', ManagementDepartmentController.getAllManagementDepartments)
router.get('/:id', ManagementDepartmentController.getSingleManagementDepartment)
export const managementDepartmentRoutes = router
