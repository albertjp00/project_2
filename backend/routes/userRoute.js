const express = require("express")

const user = express.Router()

const cors = require('cors')

const {test} = require('../controllers/userController')


user.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)


user.get('/',test)

module.exports = user