import express from 'express'
import courseScheduleDto from '../dtos/courseSchedule.js'
import { schedule } from '../db/coursesSchedule.js'
import { courseScheduleValidations } from '../validations/coursesSchedule.validation.js'
import Controller from '../controllers/controller.js'
import { requireAuth, requireRole } from '../middleware/auth.middleware.js'

const courseScheduleRouter = express.Router()

const courseScheduleController = new Controller(schedule, courseScheduleDto)

courseScheduleRouter.get('/', requireAuth, courseScheduleController.getAll)
courseScheduleRouter.get('/:_id', requireAuth, courseScheduleController.getById)

courseScheduleRouter.post('/', requireRole('admin'), courseScheduleValidations, courseScheduleController.create)
courseScheduleRouter.put('/:_id', requireRole('admin'), courseScheduleController.update)
courseScheduleRouter.delete('/:_id', requireRole('admin'), courseScheduleController.delete)

export default courseScheduleRouter
