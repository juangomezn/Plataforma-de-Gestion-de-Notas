import 'dotenv/config'
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
import { PORT, HOSTNAME, MONGO_URL } from './utils/secrets.js'
import { coursesRouter, courseScheduleRouter, rolesRouter, usersRouter } from './routers/index.js'

const app = express()

main()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    secret: 'clave_secreta_segura',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

mongoose.connect(MONGO_URL).then(() => console.log('✅ Database connected'))

app.get('/', (req, res) => {
    res.send('Run Server')
})

app.use(cors())

app.use(express.json())

app.use('/auth', authRouter)
app.use('/profile', profileRoute)
app.use('/users', usersRouter)
app.use('/courseSchedule', courseScheduleRouter)
app.use('/courses', coursesRouter)
app.use('/roles', rolesRouter)

app.listen(PORT, HOSTNAME, () => {
    console.log(`🚀 Server is running on http://${HOSTNAME}:${PORT}`)
})
