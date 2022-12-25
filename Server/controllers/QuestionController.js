const { User, QuestionBank, Questions } = require('../models')

//api/question/:bankId
const getQuestionsByBank = async (req,res) => {
    try{
        const questions = await Questions.findAll({
            where: {bankId: req.params.bankId}
        })
        res.send(questions)
    }
    catch (error) {
        throw error
    }
}
//api/question/:bankId/:tag
const getQuestionByTag = async (req,res) => {
    try{
        const response = await Questions.findAll({
            where: {
                bankId:req.params.bankId,
                tag: req.params.tag
            }
        })
        res.send(response)
    }
    catch (error){throw error}
}
//api/question/:bankId/:difficulty
const getQuestionByDifficulty = async (req,res) => {
    try{
        const response = await Questions.findAll({
            where: {
                bankId:req.params.bankId,
                difficulty: req.params.difficulty
            }
        })
        res.send(response)
    }
    catch (error){throw error}
}

//api/question
const createQuestion = async (req,res) => {
    try{
        const create = await Questions.create(req.body)
        res.send(create);
    }
    catch (error){throw error}
}
//api/question/:id
const updateQuestion = async (req,res) => {
    try{
        const updateQuestion = await Questions.update(
            req.body,
            {
            where: { id: req.params.id },
            returning: true
            }
        )
        res.send(updateQuestion)        
    }
    catch (error) {
        throw error
    }
}

const deleteQuestion = async (req,res) => {
    try{
        await Questions.destroy({where: {id: req.params.id}})
        res.send(`Deleted question with ID: ${req.params.id}`)
    }
    catch (error) {
        throw error
    }
}
module.exports = {
    getQuestionsByBank,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestionByTag,
    getQuestionByDifficulty
}