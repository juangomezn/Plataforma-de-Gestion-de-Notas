import express from 'express'
import usersDto from '../dtos/users.js';
import { user } from '../db/users.js';
import { userValidations } from '../validations/users.validation.js';
import Controller from '../controllers/controller.js';
import passport from "passport";

const userRouter = express.Router()

const userController = new Controller(user, usersDto);

userRouter.get('/', userController.getAll)

userRouter.get('/:_id', userController.getById)

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

        const updatedUser = await user.findByIdAndUpdate(id, updateData, { new: true })

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        res.json({ message: 'Usuario actualizado', user: updatedUser })
    } catch (err) {
        res.status(500).json({ message: 'Error al actualizar el usuario', error: err.message })
    }
})

userRouter.delete('/:_id', userController.delete)

export default userRouter