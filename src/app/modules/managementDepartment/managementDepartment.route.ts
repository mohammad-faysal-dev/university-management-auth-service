import express from 'express'
import { ManagementDepartmentController } from './managementDepartment.controller.js'
const router = express.Router()

router.post(
  '/create-management',
  ManagementDepartmentController.createManagementDepartment,
)
router.get('/', ManagementDepartmentController.getAllManagementDepartments)
export const managementDepartmentRoutes = router
