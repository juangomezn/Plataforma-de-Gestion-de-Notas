import { generateCollection } from './db.js'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    rol: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roles',
    },
    codeUser: {
        type: String,
        unique: true,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    identification: {
        type: {
            type: String,

        },
        number: {
            type: String,

        }
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    birthdate: {
        type: Date,
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Email no válido']
    },
    googleId:{
        type: String 
    },
    photo:{
        type: String
    },
    address: {
        street: {
            type: String,

        },
        number: {
            type: String,

        }
    },
    city: {
        code: {
            type: String,

        },
        name: {
            type: String,

        }
    },
    active: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

export const user = generateCollection('users', userSchema)