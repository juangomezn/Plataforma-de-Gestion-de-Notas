import express from 'express'
import coursesDto from '../dtos/courses.js';
import { course } from '../db/courses.js';
import { courseValidations } from '../validations/courses.validation.js';
import Controller from '../controllers/controller.js';

const coursesRouter = express.Router()

const coursesController = new Controller(course, coursesDto);

    coursesRouter.get('/',coursesController.getAll)

    coursesRouter.get('/:_id', coursesController.getById)

    coursesRouter.post('/',courseValidations, coursesController.create)

    coursesRouter.put('/:_id', coursesController.update)

    coursesRouter.delete('/:_id', coursesController.delete)

export default coursesRouter