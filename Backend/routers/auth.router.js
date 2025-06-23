import express from 'express'
import passport from 'passport'

const router = express.Router()

// Ruta para redirigir a Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))

// Callback de Google
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        session: true
    }),
    (req, res) => {
        // Redirige al frontend para completar el perfil
        res.send('Autenticado correctamente con Google 🎉')
    }
)

router.get('/failure', (req, res) => {
    res.send('Error de autenticación')
})

export default router