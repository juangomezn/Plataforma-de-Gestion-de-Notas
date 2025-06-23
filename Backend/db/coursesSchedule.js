import { generateCollection } from './db.js'
import mongoose from 'mongoose';

const courseScheduleSchema = new mongoose.Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: true
    },
    classroom: {
        code: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        capacity: {
            type: Number,
            required: true,
            min: 1
        },
        active: {
            type: Boolean,
            default: true
        }
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students: [{
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', 
            required: true
        },
        registerDate: {
            type: Date,
            default: Date.now
        },
        score: {
            type: Number,
            min: 0,
            max: 100
        },
        comments: {
            type: String,
            trim: true
        }
    }],
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > this.startDate;
            },
            message: 'La fecha de fin debe ser posterior a la fecha de inicio'
        }
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export const schedule = generateCollection('courseSchedule', courseScheduleSchema)