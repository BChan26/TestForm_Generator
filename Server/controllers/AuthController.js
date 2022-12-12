const { User } = require('../models')
const auth = require('../middleware/auth')

// url: /api/auth/login
const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
      raw: true
    })
    console.log(user && (await auth.comparePassword(req.body.password, user.passwordDigest)))
    if (user && (await auth.comparePassword(req.body.password, user.passwordDigest))) {
      let payload = {
        id: user.id,
        username: user.username,
      }
      let token = auth.createToken(payload)
      return res.send({ user: payload, token})
    }
    res.status(401).send({status: 'Error', msg: 'Unauthorized: Login Failed'})
  } catch (error) {
    throw error
  }
}

// url: /api/auth/register
const Register = async (req, res) => {
  try {
    const { username, password } = req.body
    let passwordDigest = await auth.hashPassword(password)
    const user = await User.create({ username, passwordDigest })
    res.send(user)
  } catch (error) {
    throw error
  }
}

// url: /api/auth/update
const UpdatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    const user = await User.findByPk(req.params.user_id)
    if (user && (await auth.comparePassword(oldPassword, user.dataValues.passwordDigest))) {
      let passwordDigest = await auth.hashPassword(newPassword)
      await user.update({ passwordDigest })
      return res.send({status: 'Ok', payload: user })
    }
    res.status(401).send({status: 'Error', msg: 'Unauthorized: update password failed'})
  } catch (error) {

  }
}

// url: /api/auth/session
const CheckSession = async (req, res) => {
  const { payload } = res.locals
  res.send(payload)
}

module.exports = {
  Login,
  UpdatePassword,
  Register,
  CheckSession,
}