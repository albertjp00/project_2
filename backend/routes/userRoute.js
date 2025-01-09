const express = require("express")

const user = express.Router()

const cors = require('cors')

const {test, register, login} = require('../controllers/userController')


user.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)

user.use(express.json())


user.get('/',test)

user.post('/login',login)

user.post('/register',register)

module.exports = user