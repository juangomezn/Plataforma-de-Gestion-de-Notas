import { generateCollection } from './db.js'
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    intensity: {
        type: Number,
        required: true,
        min: 1
    },
    weight: {
        type: Number,
        required: true,
        min: 0
    },
    active: {
        type: Boolean,
        default: true
    },
    topics: [{
        code: {
            type: String,
            required: true,
            trim: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        active: {
            type: Boolean,
            default: true
        }
    }]
}, {
    timestamps: true
});

export const course = generateCollection('course', courseSchema)