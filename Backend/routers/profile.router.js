import express from 'express'

const profileRoute = express.Router();

const checkAuth = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login')
    }
    else{
        next()
    }
}

profileRoute.get('/', checkAuth, (req, res) => {
    res.render('profile', {user: req.user})
})

export default profileRoute;