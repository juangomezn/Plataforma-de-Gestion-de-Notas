import express from 'express'
import Controller from '../controllers/controller.js'
import EnrollmentDTO from '../dtos/enrollment.js'
import Enrollment from '../db/enrollment.js'

const enrollmentRouter = express.Router()

const controller = new Controller(Enrollment, EnrollmentDTO) 

enrollmentRouter.get('/', controller.getAllPopulated)
enrollmentRouter.post('/', controller.create)
enrollmentRouter.delete('/:_id', controller.delete)

export default enrollmentRouter