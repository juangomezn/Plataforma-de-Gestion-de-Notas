import express from 'express'
import mongoose from 'mongoose'
import { user } from '../db/users.js'
import usersDto from '../dtos/users.js'
import Controller from '../controllers/controller.js'
import { userValidations } from '../validations/users.validation.js'
import { generateCodeUser } from '../utils/genereateCodeUser.js'
import { requireAuth, requireRole, requireSelfOrAdmin } from '../middleware/auth.middleware.js'

const userRouter = express.Router()
const userController = new Controller(user, usersDto)

const getAllUsers = async () => {
    const users = await user.aggregate([
        {
            $lookup: {
                from: 'roles',
                localField: 'rol',
                foreignField: '_id',
                as: 'rol'
            }
        },
        {
            $unwind: {
                path: '$rol',
                preserveNullAndEmptyArrays: true,
            },
        },
        {
            $project: {
                firstName: 1,
                lastName: 1,
                email: 1,
                rol: '$rol.type',
            },
        },
    ])
    return users
}

userRouter.get('/', requireRole('admin'), async (req, res) => {
    try {
        const users = await getAllUsers()
        res.json(users)
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los usuarios', details: err.message })
    }
})

userRouter.post('/complete-profile', requireAuth, async (req, res) => {
    try {
        const data = req.body

        if (!data.email) {
            return res.status(400).json({ error: 'El campo "email" es obligatorio' })
        }

        if (data.email.toLowerCase() !== req.user.email?.toLowerCase()) {
            return res.status(403).json({ error: 'El email debe coincidir con la cuenta de Google con la que iniciaste sesión' })
        }

        const existingUser = await user.findOne({ email: data.email })

        if (!existingUser) {
            return res.status(404).json({ error: 'No se encontró un usuario con ese email' })
        }

        if (existingUser._id.toString() !== req.user._id.toString()) {
            return res.status(403).json({ error: 'No puedes completar el perfil de otro usuario' })
        }

        const codeUser = existingUser.codeUser || await generateCodeUser(data.rol)

        const updateData = {
            rol: data.rol,
            codeUser,
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

userRouter.post('/', requireRole('admin'), userValidations, userController.create)

userRouter.get('/:_id', requireSelfOrAdmin, async (req, res) => {
    try {
        const { _id } = req.params

        const userData = await user.aggregate([
            {
                $match: { _id: new mongoose.Types.ObjectId(_id) }
            },
            {
                $lookup: {
                    from: 'roles',
                    localField: 'rol',
                    foreignField: '_id',
                    as: 'rol'
                }
            },
            { $unwind: { path: '$rol', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    photo: 1,
                    rol: '$rol.type',
                    codeUser: 1,
                    identification: 1,
                    gender: 1,
                    birthdate: 1,
                    address: 1,
                    city: 1
                }
            }
        ])

        if (!userData.length) {
            return res.status(404).json({ error: 'Usuario no encontrado' })
        }

        res.json(userData[0])
    } catch (err) {
        res.status(500).json({
            error: 'Error al obtener el usuario',
            details: err.message
        })
    }
})

userRouter.put('/:id', requireRole('admin'), async (req, res) => {
    try {
        const updateData = req.body
        const { id } = req.params

        const existingUser = await user.findById(id)
        if (!existingUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' })
        }

        if (updateData.rol && typeof updateData.rol === 'string') {

            if (!mongoose.Types.ObjectId.isValid(updateData.rol)) {
                return res.status(400).json({ message: 'El ID de rol no es válido' })
            }
            updateData.rol = new mongoose.Types.ObjectId(updateData.rol)
        }

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

userRouter.delete('/:_id', requireRole('admin'), userController.delete)

export default userRouter
