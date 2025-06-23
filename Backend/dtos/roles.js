export default class rolesDto {
    constructor(data) {
        if (data._id) {
            if (!mongoose.Types.ObjectId.isValid(data._id)) {
                throw new Error('El campo "_id" debe ser un ObjectId válido')
            }
            this._id = data._id
        }

        const validRoles = ["admin", "teacher", "student"]
        if (!validRoles.includes(data.type)) {
            throw new Error(`El campo "type" debe ser uno de: ${validRoles.join(', ')}`)
        }

        this.type = data.type
    }
}
