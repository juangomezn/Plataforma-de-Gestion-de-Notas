import express from 'express'
import passport from 'passport'

const router = express.Router()

// Redirige a Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// Callback después de Google
router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/failure' }),
    (req, res) => {
        if (!req.user || !req.user._id) {
            return res.redirect('/auth/failure')
        }

        const userId = req.user._id.toString()
        // ✅ Redirigir al frontend con el ID
        res.redirect(`http://localhost:5173/complete-profile?userId=${userId}`)
    }
)

router.get('/auth/failure', (req, res) => {
    res.send('Error de autenticación con Google')
})

export default router
