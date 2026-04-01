import dotenv from 'dotenv'
import fs from 'fs'

if(fs.existsSync('.env')) {
    dotenv.config({path:'.env'})
} else {
    console.log('No existe el archivo .env')
}

export const ENVIRONMENT = process.env.NODE_ENV

const prod = ENVIRONMENT === 'production'

export const PORT = (process.env.APP_PORT || 3000)
export const HOSTNAME = (process.env.APP_HOSTNAME || 'localhost')

/** Origen del frontend (CORS + redirects OAuth). En dev con Vite: http://localhost:5173 */
export const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173'

export const SESSION_SECRET = process.env.SESSION_SECRET || 'cambiar_en_produccion_SESSION_SECRET'

export const MONGO_URL = prod ?
    process.env.MONGO_URL_PROD :
    process.env.MONGO_URL_LOCAL

if(!MONGO_URL) {
    if(prod)
        console.log('No hay cadena de conexion de produccion configurada para la base de datos')
    else
        console.log('No hay cadena de conexion de desarrollo configurada para la base de datos')
    process.exit(1)
}