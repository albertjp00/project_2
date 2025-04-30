const express = require("express")

const user = express.Router()

const cors = require('cors')

const { register, login, getProducts, cartAdd, loadCart, 
    cartRemove, placeOrder, myOrders, 
    verifyPayment, chatbot,
    googleAuth,
    applyCoupon,
    removeCoupon,
    getCoupon} = require('../controllers/userController')



user.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)

user.use(express.json())



user.post('/login',login)

// user.post('/auth/google',googleAuth)

user.post('/register',register)

user.get('/getProducts',getProducts)

user.post('/cartAdd',cartAdd)

user.get('/cart',loadCart)

user.post('/cartRemove',cartRemove)

user.post('/placeOrder',placeOrder)

user.post('/verifyPayment',verifyPayment)

user.get('/myOrders',myOrders)

user.post('/chatbot',chatbot)

user.post('/getCoupon',getCoupon)

user.post('/applyCoupon',applyCoupon)

user.post('/removeCoupon',removeCoupon)

module.exports = user