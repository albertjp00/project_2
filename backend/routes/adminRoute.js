const express = require('express')

const admin = express.Router()

const multer = require('multer')

const cors = require('cors')

const { login,addProduct, getList,  unlist, 
    listItem, editItem, getEdit, listOrders, 
    updateStatus,
    addCoupon,
    getCoupon,
    deleteCoupon} = require('../controllers/adminController')


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


admin.post('/login',login)

admin.post('/addProduct',upload.single("image"),addProduct)

admin.get('/getList',getList)

admin.post('/unlist',unlist)

admin.post('/listItem',listItem)

admin.get('/getEdit',getEdit)

admin.post('/editItem',upload.single("image"),editItem)

admin.get('/listOrders',listOrders)

admin.post('/updateStatus',updateStatus)

admin.get('/getCoupon',getCoupon)

admin.post('/addCoupon',addCoupon)

admin.get('/getCoupon',getCoupon)

admin.post('/deleteCoupon',deleteCoupon)

module.exports = admin