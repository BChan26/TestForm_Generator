const Router = require('express').Router()
const controller = require('../controllers/QuestionController.js')

// Router.get('/', controller.GetProfiles)
// Router.get('/:user_id', controller.GetUserProfile)


Router.get('/:bankId/:tag', controller.getQuestionByTag)
Router.get('/:bankId',controller.getQuestionsByBank)



Router.post('/', controller.createQuestion)
Router.put('/:id',controller.updateQuestion)
Router.delete('/:id', controller.deleteQuestion)

module.exports = Router