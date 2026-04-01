import express from 'express'
import passport from 'passport'
import { user as UserModel } from '../db/users.js'
import { FRONTEND_URL } from '../utils/secrets.js'

const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    (req, res) => {
        const userId = req.user._id.toString()

        if (req.user.firstName && req.user.rol) {
            res.redirect(`${FRONTEND_URL}/user-profile?userId=${userId}`)
        } else {
            res.redirect(`${FRONTEND_URL}/complete-profile?userId=${userId}`)
        }
    }
)

router.get('/failure', (req, res) => {
    res.send('Error de autenticación con Google')
})

router.get('/me', async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ authenticated: false })
    }
    try {
        const u = await UserModel.findById(req.user._id).populate('rol')
        if (!u) {
            return res.status(401).json({ authenticated: false })
        }
        res.json({
            authenticated: true,
            user: {
                _id: u._id,
                email: u.email,
                firstName: u.firstName,
                lastName: u.lastName,
                photo: u.photo,
                roleType: u.rol?.type ?? null,
                roleId: u.rol?._id ?? null,
            },
        })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ error: err.message })
        }
        req.session.destroy((destroyErr) => {
            if (destroyErr) {
                return res.status(500).json({ error: destroyErr.message })
            }
            res.clearCookie('connect.sid', { path: '/' })
            res.json({ ok: true })
        })
    })
})

export default router
