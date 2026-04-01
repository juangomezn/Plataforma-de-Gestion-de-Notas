import express from 'express'
import mongoose from 'mongoose'
import { course } from '../db/courses.js'
import coursesDto from '../dtos/courses.js'
import Controller from '../controllers/controller.js'
import { courseValidations } from '../validations/courses.validation.js'
import { requireAuth, requireRole } from '../middleware/auth.middleware.js'

const courseRouter = express.Router()
const courseController = new Controller(course, coursesDto)

courseRouter.get('/', requireAuth, async (req, res) => {
    try {
        const courses = await course.find({}, {
            code: 1,
            description: 1,
            intensityHours: 1,
            weight: 1,
            topics: 1
        })
        res.json(courses)
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los cursos', details: error.message })
    }
})

courseRouter.get('/:_id', requireAuth, async (req, res) => {
    try {
        const found = await course.findById(req.params._id)
        if (!found) return res.status(404).json({ message: 'Curso no encontrado' })
        res.json(found)
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el curso', error: err.message })
    }
})

courseRouter.post('/', requireRole('admin'), courseValidations, courseController.create)

courseRouter.put('/:_id', requireRole('admin'), async (req, res) => {
    try {
        const { _id } = req.params
        const data = req.body

        const updatedCourse = await course.findByIdAndUpdate(_id, data, { new: true })
        if (!updatedCourse) return res.status(404).json({ message: 'Curso no encontrado' })

        res.json({ message: 'Curso actualizado', course: updatedCourse })
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el curso', error: err.message })
    }
})

courseRouter.delete('/:_id', requireRole('admin'), courseController.delete)

export default courseRouter
