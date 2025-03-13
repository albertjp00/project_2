const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    userId :{
        type:String,
        default:1
    },
    items:{
        type:Array,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:Object,
        required:true
    },
    status:{
        type:String,
        default:"Food Processing"
    },
    date:{
        type:Date,
        default:Date.now()
    },
    payment:{
        type:String,
        default:false
    },
    razorpayOrderId:{
        type:String,
        required:false
    }


})

module.exports = mongoose.model('order',orderSchema)


