const express = require("express")

const user = express.Router()

const cors = require('cors')

const { register, login, getProducts, cartAdd, loadCart, cartRemove, placeOrder, myOrders} = require('../controllers/userController')


user.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)

user.use(express.json())



user.post('/login',login)

user.post('/register',register)

user.get('/getProducts',getProducts)

user.post('/cartAdd',cartAdd)

user.get('/cart',loadCart)

user.post('/cartRemove',cartRemove)

user.post('/placeOrder',placeOrder)

user.get('/myOrders',myOrders)

module.exports = user