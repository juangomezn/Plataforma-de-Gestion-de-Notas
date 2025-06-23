import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { user as UserModel } from '../../db/users.js'

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}, async (_, __, profile, done) => {
    try {
        let user = await UserModel.findOne({ googleId: profile.id })

        if (!user) {
            user = await UserModel.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                rol: null,
                codeUser: null,
                firstName: null,
                lastName: null,
                identification: { type: null, number: null },
                gender: null,
                birthdate: null,
                address: { street: null, number: null },
                city: { code: null, name: null },
                active: true
            })
        }

        done(null, user)
    } catch (err) {
        done(err, null)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id)
        done(null, user)
    } catch (err) {
        done(err, null)
    }
})
