import express from 'express'
import rolesDto from '../dtos/roles.js';
import { rol } from '../db/roles.js';
import { rolValidations } from '../validations/roles.validation.js';
import Controller from '../controllers/controller.js';

const rolesRouter = express.Router()

const rolesController = new Controller (rol, rolesDto);

    rolesRouter.get('/',rolesController.getAll)

    rolesRouter.get('/:_id', rolesController.getById)

    rolesRouter.post('/',rolValidations, rolesController.create)

    rolesRouter.put('/:_id', rolesController.update)

    rolesRouter.delete('/:_id', rolesController.delete)

export default rolesRouter