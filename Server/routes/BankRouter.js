const Router = require('express').Router()
const controller = require('../controllers/BankController')

// Router.get('/', controller.GetProfiles)
// Router.get('/:user_id', controller.GetUserProfile)

//api/bank
Router.get('/', controller.getBanks)
Router.get('/:userId', controller.getBanksByUser)
Router.post('/', controller.createBank)
Router.put('/:id', controller.updateBank)
Router.delete('/:id', controller.deleteBank)

module.exports = Router