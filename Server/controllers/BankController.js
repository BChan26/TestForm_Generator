const { User, QuestionBank, Questions } = require('../models')


//api/bank/
const getBanks = async (req, res) => {
    try {
        const banks = await QuestionBank.findAll()
        res.send(banks)
    }
    catch (error) {
        throw error
    }
}
//api/bank/bankId/:bankId
const getBankById = async (req, res) => {
    try {
        const bank = await QuestionBank.findOne({
            where: {id: req.params.bankId}, 
            include: [{
                model: Questions,
                as: 'q',
                attributes: ['id','question','topic','difficulty','answers','correct','image','type','tag']
            }]})
        res.send(bank)
    }
    catch (error) {
        throw error
    }
}
//api/bank/:userId
const getBanksByUser = async (req,res) => {
    try{
        const banks = await QuestionBank.findAll({
            where: {userId: req.params.userId},
            include: [{
                model: Questions,
                as: 'q',
                attributes: ['id','question','topic','difficulty','answers','correct','image','type','tag']
            }]
        })
        res.send(banks)
    }
    catch (error) {
        throw error
    }
}

//api/bank/
// {
//     "title":"bank4",
//     "user_id":2
// }
const createBank = async (req, res) => {
    try{
        const create = await QuestionBank.create(req.body)
        res.send(create);
    }catch (error) {
        throw error
    }
}
//api/bank/:bankId
const updateBank = async(req,res) => {
    try{
        const updateBank = await QuestionBank.update(
            req.body,
            {
            where: { id: req.params.id },
            returning: true
            }
        )
        res.send(updateBank)
    }catch(error)
    {throw error}
}

//api/bank/:bankId
const deleteBank = async (req, res) => {
    try {
    await QuestionBank.destroy({
        where: {id: req.params.id},
        trunicate: true
    })
    res.send(`Deleted Bank with ID: ${req.params.id}`)
    } catch (error) {
    throw error
    }
} 


module.exports = {
    getBanks,
    getBankById,
    getBanksByUser,
    createBank,
    updateBank,
    deleteBank
}