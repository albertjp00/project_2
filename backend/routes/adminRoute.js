const express = require('express')

const admin = express.Router()

const multer = require('multer')

const cors = require('cors')

const { addProduct } = require('../controllers/adminController')


admin.use(express.json())

admin.use(
    cors({
        credentials:true,
        origin:'http://localhost:5173'
    })
)


const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({
    storage:storage
})



admin.post('/addProduct',upload.single("image"),addProduct)

module.exports = admin