import mongoose from "mongoose"

export default class UsersDto {
    constructor(data) {

        if (!mongoose.Types.ObjectId.isValid(data.rol)) {
            throw new Error('El campo "role" debe ser un ObjectId válido')
        }

        if (typeof data.codeUser !== 'string') {
            throw new Error('El campo "codeUser" debe ser un string')
        }
        if (typeof data.firstName !== 'string' || typeof data.lastName !== 'string') {
            throw new Error('firstName y lastName deben ser strings')
        }

        if (
            typeof data.identification !== 'object' || data.identification === null ||
            typeof data.identification.type !== 'string' ||
            typeof data.identification.number !== 'string'
        ) {
            throw new Error('El campo "identification" debe tener "type" y "number" como strings')
        }

        const validGenders = ['Male', 'Female', 'Other']
        if (!validGenders.includes(data.gender)) {
            throw new Error(`El campo "gender" debe ser uno de: ${validGenders.join(', ')}`)
        }

        if (!data.birthdate || isNaN(Date.parse(data.birthdate))) {
            throw new Error('El campo "birthdate" debe ser una fecha válida')
        }

        if (typeof data.email !== 'string') {
            throw new Error('El campo "email" debe ser un string')
        }

        if (
            typeof data.address !== 'object' || data.address === null ||
            typeof data.address.street !== 'string' ||
            typeof data.address.number !== 'string'
        ) {
            throw new Error('El campo "address" debe tener "street" y "number" como strings')
        }

        if (
            typeof data.city !== 'object' || data.city === null ||
            typeof data.city.code !== 'string' ||
            typeof data.city.name !== 'string'
        ) {
            throw new Error('El campo "city" debe tener "code" y "name" como strings')
        }

        this.rol = data.rol
        this.codeUser = data.codeUser
        this.firstName = data.firstName
        this.lastName = data.lastName
        this.identification = {
            type: data.identification.type,
            number: data.identification.number
        }
        this.gender = data.gender
        this.birthdate = new Date(data.birthdate)
        this.email = data.email
        this.address = {
            street: data.address.street,
            number: data.address.number
        }
        this.city = {
            code: data.city.code,
            name: data.city.name
        }
    }
}
