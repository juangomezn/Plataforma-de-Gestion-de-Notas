export default class coursesDto {
    constructor(data) {
        
        if (typeof data.code !== 'string') {
            throw new Error('El campo "code" debe ser un string')
        }
        if (typeof data.description !== 'string') {
            throw new Error('El campo "description" debe ser un string')
        }
        if (typeof data.intensity !== 'number') {
            throw new Error('El campo "intensity" debe ser un número')
        }
        if (typeof data.weight !== 'number') {
            throw new Error('El campo "weight" debe ser un número')
        }
        if (typeof data.active !== 'boolean') {
            throw new Error('El campo "active" debe ser booleano')
        }

        this.code = data.code
        this.description = data.description
        this.intensity = data.intensity
        this.weight = data.weight
        this.active = data.active

        if (!Array.isArray(data.topics)) {
            throw new Error('El campo "topics" debe ser un arreglo')
        }

        this.topics = data.topics.map((topic, i) => {
            if (
                typeof topic !== 'object' || topic === null ||
                typeof topic.code !== 'string' ||
                typeof topic.title !== 'string' ||
                typeof topic.description !== 'string' ||
                typeof topic.active !== 'boolean'
            ) {
                throw new Error(`El topic en la posición ${i} no es válido`)
            }

            return {
                code: topic.code,
                title: topic.title,
                description: topic.description,
                active: topic.active
            }
        })
    }
}
