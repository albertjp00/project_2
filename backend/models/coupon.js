const mongoose = require('mongoose')


const couponSchema = new mongoose.Schema({
    name:{
        type:String,
        required : true
    },
    amount:{
        type:String,
        required:true
    }
})


module.exports= mongoose.model('coupon',couponSchema)