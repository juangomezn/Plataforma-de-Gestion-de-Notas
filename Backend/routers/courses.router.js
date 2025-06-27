import express from 'express'
import mongoose from 'mongoose'
import { course } from '../db/courses.js'
import coursesDto from '../dtos/courses.js'
import Controller from '../controllers/controller.js'
import { courseValidations } from '../validations/courses.validation.js'

const courseRouter = express.Router()
const courseController = new Controller(course, coursesDto)

// GET ALL (resumen)
courseRouter.get('/', async (req, res) => {
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

// GET BY ID (detalle completo con temas)
courseRouter.get('/:_id', async (req, res) => {
    try {
        const found = await course.findById(req.params._id)
        if (!found) return res.status(404).json({ message: 'Curso no encontrado' })
        res.json(found)
    } catch (err) {
        res.status(500).json({ message: 'Error al obtener el curso', error: err.message })
    }
})

// CREATE
courseRouter.post('/', courseValidations, courseController.create)

// UPDATE (puedes agregar, actualizar o eliminar temas)
courseRouter.put('/:_id', async (req, res) => {
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

// DELETE
courseRouter.delete('/:_id', courseController.delete)

export default courseRouter
