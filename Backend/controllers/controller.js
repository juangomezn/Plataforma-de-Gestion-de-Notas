import modelo from '../models/model.js'
import mongoose from 'mongoose'
import { validationResult } from "express-validator";

export default class Controller{

    #model
    #dto

    constructor(db, dto){
        this.#model = new modelo(db)
        this.#dto = dto
        this.getAll = this.getAll.bind(this)
        this.getById = this.getById.bind(this)
        this.create = this.create.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    async getAll(req, res){
        const couses = await this.#model.getAll()
        res.json(couses)
    }

    async getById(req, res){
        const couses = await this.#model.getById(new mongoose.Types.ObjectId(req.params._id))
        res.json(couses)
    }

    async create(req, res){
        const error = validationResult(req)
        if (!error.isEmpty()){
            res.status(400).send(error)
            return
        }
        const result = await this.#model.create({...(new this.#dto(req.body)), active: true} )
        res.json(result)
    }

    async update(req, res){
        const _id = new mongoose.Types.ObjectId(req.params._id)
        const product = await this.#model.update(_id, req.body)
        res.json(product)
    }

    async delete(req, res){
        const result = await this.#model.delete(new mongoose.Types.ObjectId(req.params._id))
        res.json(result)
    }
}