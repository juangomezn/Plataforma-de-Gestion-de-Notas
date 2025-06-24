import express from 'express'
import cors from 'cors'
import passport from 'passport'
import { user } from '../db/users.js'
import usersDto from '../dtos/users.js'
import Controller from '../controllers/controller.js'
import { userValidations } from '../validations/users.validation.js'
import { generateCodeUser } from '../utils/genereateCodeUser.js'


const userRouter = express.Router()
const userController = new Controller(user, usersDto)

userRouter.get('/', userController.getAll)
userRouter.get('/:_id', userController.getById)


userRouter.post('/complete-profile', async (req, res) => {
    try {
        const data = req.body

        if (!data.email) {
            return res.status(400).json({ error: 'El campo "email" es obligatorio' })
        }

        // Buscar el usuario existente por email
        const existingUser = await user.findOne({ email: data.email })

        if (!existingUser) {
            return res.status(404).json({ error: 'No se encontró un usuario con ese email' })
        }

        // Generar nuevo código de usuario si aún no lo tiene
        const codeUser = existingUser.codeUser || await generateCodeUser(data.rol)

        // Actualizar los datos del perfil
        const updateData = {
            rol: data.rol,
            codeUser: data.codeUser,
            firstName: data.firstName,
            lastName: data.lastName,
            identification: data.identification,
            gender: data.gender,
            birthdate: data.birthdate,
            address: data.address,
            city: data.city,
        }

        const updatedUser = await user.findByIdAndUpdate(existingUser._id, updateData, { new: true })

        res.status(200).json({ message: 'Perfil completado con éxito', user: updatedUser })
    } catch (error) {
        res.status(500).json({ error: 'Error al completar el perfil', details: error.message })
    }
})


userRouter.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/error' }),
    (req, res) => {
        const userId = req.user._id.toString()
        res.redirect(`http://localhost:5173/welcome?userId=${userId}`)
    }
)

userRouter.post('/', userValidations, userController.create)

userRouter.put('/:id', async (req, res) => {
    try {
        const updateData = req.body
        const { id } = req.params

        // Generar el codeUser basado en el rol si aún no tiene uno
        const existingUser = await user.findById(id)
        if (!existingUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        // Solo generar si no tiene codeUser aún
        if (!existingUser.codeUser && updateData.rol) {
            const codeUser = await generateCodeUser(updateData.rol)
            updateData.codeUser = codeUser
        }

        const updatedUser = await user.findByIdAndUpdate(id, updateData, { new: true })

        res.json({ message: 'Usuario actualizado', user: updatedUser })
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error: err.message })
    }
})


userRouter.delete('/:_id', userController.delete)

export default userRouter
