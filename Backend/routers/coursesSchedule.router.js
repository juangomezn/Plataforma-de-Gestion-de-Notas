import express from 'express'
import courseScheduleDto from '../dtos/courseSchedule.js';
import { schedule } from '../db/coursesSchedule.js';
import { courseScheduleValidations } from '../validations/coursesSchedule.validation.js';
import Controller from '../controllers/controller.js';

const courseScheduleRouter = express.Router()

const courseScheduleController = new Controller(schedule, courseScheduleDto);

    courseScheduleRouter.get('/',courseScheduleController.getAll)

    courseScheduleRouter.get('/:_id', courseScheduleController.getById)

    courseScheduleRouter.post('/',courseScheduleValidations , courseScheduleController.create)

    courseScheduleRouter.put('/:_id', courseScheduleController.update)

    courseScheduleRouter.delete('/:_id', courseScheduleController.delete)

export default courseScheduleRouter