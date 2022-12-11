const { User, QuestionBank } = require('../models')


const getUsers = async (req, res) => {
    try {
        const users = await User.findAll()
        res.send(users)
    }
    catch (error) {
        throw error
    }
}

module.exports = {
    getUsers,
}