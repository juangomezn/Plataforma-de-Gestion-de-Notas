export default class model {

    #model

    constructor(db){
        this.#model = db
    }

    async getAll(){
        return this.#model.find()
    }

    async getById(_id){
        return this.#model.findOne({_id})
    }

    async create(course){
        return this.#model.insertOne(course);
    }

    async update(_id, updateData){
        return this.#model.updateOne({_id}, { $set: updateData});
    }

    async delete(_id){
        return this.#model.deleteOne({_id});
    }

}