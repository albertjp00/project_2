const express = require("express")

const user = express.Router()

const cors = require('cors')

const {test, register, login, getProducts, cartAdd} = require('../controllers/userController')


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

user.get('/getProducts',getProducts)

user.post('/cartAdd',cartAdd)

module.exports = user