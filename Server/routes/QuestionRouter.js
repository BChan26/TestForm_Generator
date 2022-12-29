const Router = require('express').Router()
const controller = require('../controllers/QuestionController.js')

// Router.get('/', controller.GetProfiles)
// Router.get('/:user_id', controller.GetUserProfile)

//api/question/
Router.get('/:bankId/:difficulty/:type', controller.getQuestionByDifficulty)
Router.get('/tagged/:bankId/:difficulty/:tag/:type', controller.getQuestionByTag)
Router.get('/:bankId',controller.getQuestionsByBank)
Router.get('/getter/:bankId/:difficulty/:tag/:type', controller.getQuestionByParams)
Router.get('/getter/:bankId/:difficulty/:type', controller.getQuestionNoTag)

Router.post('/', controller.createQuestion)
Router.put('/:id',controller.updateQuestion)
Router.delete('/:id', controller.deleteQuestion)

module.exports = Router