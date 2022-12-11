const Router = require('express').Router()
const controller = require('../controllers/UserController.js')

// Router.get('/', controller.GetProfiles)
// Router.get('/:user_id', controller.GetUserProfile)

Router.get('/', controller.getUsers)

module.exports = Router