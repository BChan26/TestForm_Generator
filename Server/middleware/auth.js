const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const APP_SECRET = process.env.APP_SECRET

const hashPassword = async (password) => {
  
  let hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  return hashedPassword
}

const comparePassword = async (password, storedPasswordHash) => {
  let passwordMatch = await bcrypt.compare(password, storedPasswordHash)
  return passwordMatch
}

const createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET)
  return token
}

const verifyToken = (req, res, next) => {
  const { token } = res.locals  // gets token stored in request lifecycle
  try {
    let payload = jwt.verify(token, APP_SECRET)
    if (payload) {
      res.locals.payload = payload  // passes decoded payload to next function
      return next()  // calls next if token is valid
    }
    res.status(401).send({status: 'Error', msg: 'Unauthorized: Token verification failed, payload'})
  } catch (error) {
    res.status(401).send({status: 'Error', msg: 'Unauthorized: Token verification failed, token'})
  }
}

const stripToken = (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1]
    if (token) {
      // if token exists add to request lifecycle
      res.locals.token = token
      return next()
    }
  } catch (error) {
    res.status(401).send({status: 'Error', msg: 'Unauthorized: Failed to read token'})
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  verifyToken,
  stripToken
}