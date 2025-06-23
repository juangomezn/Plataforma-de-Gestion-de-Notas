import { generateCollection } from './db.js'
import mongoose from 'mongoose'

const rolSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ["admin", "teacher", "student"],
        unique: true,
        trim: true
    }
}, {
    timestamps: true
})

export const rol = generateCollection('roles', rolSchema)