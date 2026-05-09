import modelo from '../models/model.js'
import mongoose from 'mongoose'
import { validationResult } from "express-validator";

export default class Controller {

    #model
    #dto

    constructor(db, dto) {
        this.#model = new modelo(db)
        this.#dto = dto

        this.getAll = this.getAll.bind(this)
        this.getAllPopulated = this.getAllPopulated.bind(this)
        this.getById = this.getById.bind(this)
        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    async getAll(req, res) {
        const data = await this.#model.getAll()
        res.json(data)
    }

    async getAllPopulated(req, res) {
        try {
            const data = await this.#model.getAllPopulated()
            res.json(data)
        } catch (error) {
            console.error('ERROR EN getAllPopulated:', error)
            res.status(500).json({ message: 'Error obteniendo inscripciones' })
        }
    }

    async create(req, res) {
        try {
            const { student, course } = req.body

            if (!student || !course) {
                return res.status(400).json({ message: 'Datos incompletos' })
            }

            const existing = await this.#model.getAll({
                student,
                course,
                active: true
            })

            if (existing.length > 0) {
                return res.status(400).json({
                    message: 'El estudiante ya está inscrito en este curso'
                })
            }

            const result = await this.#model.create({
                student,
                course,
                active: true
            })

            res.json(result)

        } catch (error) {
            console.error(error)
            res.status(500).json({ message: 'Error creando inscripción' })
        }
    }

    async getById(req, res) {
        const data = await this.#model.getById(new mongoose.Types.ObjectId(req.params._id))
        res.json(data)
    }

    async update(req, res) {
        const _id = new mongoose.Types.ObjectId(req.params._id)
        const result = await this.#model.update(_id, req.body)
        res.json(result)
    }

    async delete(req, res) {
        const result = await this.#model.delete(new mongoose.Types.ObjectId(req.params._id))
        res.json(result)
    }
}