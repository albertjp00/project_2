const express = require('express')

const admin = express.Router()

const cors = require('cors')
const { addProduct } = require('../controllers/adminController')



admin.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)

admin.use(express.json)

admin.post('/addProduct',addProduct)