const Router = require('express').Router()
const BankRouter = require('./BankRouter')
const UserRouter = require('./UserRouter')
const QuestionRouter = require('./QuestionRouter')
const AuthRouter = require('./AuthRouter')



//localhost:3001/api

Router.use('/bank', BankRouter)
Router.use('/user', UserRouter)
Router.use('/question', QuestionRouter)
Router.use('/auth', AuthRouter)



module.exports = Router