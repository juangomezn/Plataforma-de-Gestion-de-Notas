export default class model {

    #model

    constructor(db) {
        this.#model = db
    }

    async getAll(filter = {}) {
        return this.#model.find(filter)
    }

    async getById(_id) {
        return this.#model.findOne({ _id })
    }

    async create(data) {
        return this.#model.create(data)
    }

    async update(_id, updateData) {
        return this.#model.updateOne({ _id }, { $set: updateData })
    }

    async delete(_id) {
        return this.#model.deleteOne({ _id })
    }

    async getAllPopulated() {
        return this.#model.find()
            .populate('student')
            .populate('course')
    }
}