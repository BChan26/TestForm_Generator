const Router = require('express').Router()
const auth = require('../middleware/auth')
const controller = require('../controllers/AuthController')

Router.post('/login', controller.Login)
Router.post('/register', controller.Register)
Router.post('/update', auth.stripToken, auth.verifyToken, controller.UpdatePassword)
Router.get('/session', auth.stripToken, auth.verifyToken, controller.CheckSession)

module.exports = Router