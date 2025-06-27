import express from 'express'
import passport from 'passport'

const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    (req, res) => {

        const userId = req.user._id.toString()

        if (req.user.firstName && req.user.rol) {
            res.redirect(`http://localhost:5173/user-profile?userId=${userId}`)
        } else {
            res.redirect(`http://localhost:5173/complete-profile?userId=${userId}`)
        }
    }
)

router.get('/auth/failure', (req, res) => {
    res.send('Error de autenticación con Google')
})

export default router