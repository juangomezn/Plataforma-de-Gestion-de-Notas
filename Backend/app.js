import 'dotenv/config'
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import cors from "cors"
import express from 'express'
import mongoose from 'mongoose'
import passport from 'passport'
import { main } from './db/db.js'
import './config/src/passport.js'
import bodyParser from 'body-parser'
import session from 'express-session'
import authRouter from './routers/auth.router.js'
import profileRoute from './routers/profile.router.js'
import pdfsRouter from './routers/pdf.router/index.js'
import { PORT, HOSTNAME, MONGO_URL, FRONTEND_URL, SESSION_SECRET } from './utils/secrets.js'
import { coursesRouter, courseScheduleRouter, rolesRouter, usersRouter } from './routers/index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf8'))

const app = express()

main()

app.set('trust proxy', 1)

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
}))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
    },
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(MONGO_URL).then(() => console.log('✅ Database connected'))

app.get('/', (req, res) => {
    res.json({
        service: 'acme-school-api',
        version: pkg.version,
        env: process.env.NODE_ENV || 'development',
    })
})

app.get('/health', (req, res) => {
    const dbConnected = mongoose.connection.readyState === 1
    const payload = {
        status: dbConnected ? 'ok' : 'degraded',
        database: dbConnected ? 'connected' : 'disconnected',
    }
    res.status(dbConnected ? 200 : 503).json(payload)
})

app.use('/auth', authRouter)
app.use('/profile', profileRoute)
app.use('/users', usersRouter)
app.use('/courseSchedule', courseScheduleRouter)
app.use('/courses', coursesRouter)
app.use('/roles', rolesRouter)
app.use('/pdfs', pdfsRouter)

app.listen(PORT, HOSTNAME, () => {
    console.log(`🚀 Server is running on http://${HOSTNAME}:${PORT}`)
})
