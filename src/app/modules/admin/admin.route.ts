import express from 'express'
import { AdminController } from './admin.controller.js'
const router = express.Router()

router.get('/:id', AdminController.getSingleAdmin)
router.delete('/:id', AdminController.deleteAdmin)
router.patch('/:id', AdminController.updateAdmin)
