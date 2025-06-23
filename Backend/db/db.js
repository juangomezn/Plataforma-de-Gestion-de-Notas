import mongoose from 'mongoose'

export const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL_LOCAL, {
        })

        console.log('✅ Conectado a MongoDB con Mongoose')
    } catch (error) {
        console.error('❌ Error al conectar con MongoDB:')
        console.error(error)
        process.exit(1)
    }
}

export const generateCollection = (nameCollection, Schema) => {

    return mongoose.models[nameCollection] || mongoose.model(nameCollection, Schema)
    
}