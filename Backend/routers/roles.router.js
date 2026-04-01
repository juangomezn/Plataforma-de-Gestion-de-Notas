import express from 'express'
import rolesDto from '../dtos/roles.js'
import { rol } from '../db/roles.js'
import { rolValidations } from '../validations/roles.validation.js'
import Controller from '../controllers/controller.js'
import { requireAuth, requireRole } from '../middleware/auth.middleware.js'

const rolesRouter = express.Router()

const rolesController = new Controller(rol, rolesDto)

rolesRouter.get('/', requireAuth, rolesController.getAll)
rolesRouter.get('/:_id', requireAuth, rolesController.getById)

rolesRouter.post('/', requireRole('admin'), rolValidations, rolesController.create)
rolesRouter.put('/:_id', requireRole('admin'), rolesController.update)
rolesRouter.delete('/:_id', requireRole('admin'), rolesController.delete)

export default rolesRouter