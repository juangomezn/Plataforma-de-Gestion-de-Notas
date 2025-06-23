import mongoose from "mongoose"

export default class courseScheduleDto {
    constructor(data) {
        
        if (!mongoose.Types.ObjectId.isValid(data.course)) {
            throw new Error('El campo "course" debe ser un ObjectId válido')
        }
        this.course = data.course

        if (!mongoose.Types.ObjectId.isValid(data.teacher)) {
            throw new Error('El campo "teacher" debe ser un ObjectId válido')
        }
        this.teacher = data.teacher

        if (
            typeof data.classroom !== 'object' || data.classroom === null ||
            typeof data.classroom.code !== 'string' ||
            typeof data.classroom.description !== 'string' ||
            typeof data.classroom.capacity !== 'number' ||
            typeof data.classroom.active !== 'boolean'
        ) {
            throw new Error('El campo "classroom" debe tener code, description (strings), capacity (number) y active (boolean)')
        }
        this.classroom = {
            code: data.classroom.code,
            description: data.classroom.description,
            capacity: data.classroom.capacity,
            active: data.classroom.active
        }

        if (!data.startDate || isNaN(Date.parse(data.startDate))) {
            throw new Error('El campo "startDate" debe ser una fecha válida')
        }
        if (!data.endDate || isNaN(Date.parse(data.endDate))) {
            throw new Error('El campo "endDate" debe ser una fecha válida')
        }
        this.startDate = new Date(data.startDate)
        this.endDate = new Date(data.endDate)

        if (typeof data.active !== 'boolean') {
            throw new Error('El campo "active" debe ser booleano')
        }
        this.active = data.active

        if (!Array.isArray(data.students)) {
            throw new Error('El campo "students" debe ser un arreglo')
        }
        this.students = data.students.map((s, i) => {
            if (
                typeof s !== 'object' || s === null ||
                !mongoose.Types.ObjectId.isValid(s.student) ||
                !s.registerDate || isNaN(Date.parse(s.registerDate)) ||
                typeof s.score !== 'number' ||
                typeof s.comments !== 'string'
            ) {
                throw new Error(`El estudiante en la posición ${i} no es válido`)
            }

            return {
                student: s.student,
                registerDate: new Date(s.registerDate),
                score: s.score,
                comments: s.comments
            }
        })
    }
}
