let mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId:{
        type:String,
        default:1
    },
    productId : {
            type : String
        },
    quantity:{
            type:Number,
            default:0
    }
    
    
}) 


module.exports = mongoose.model('carts',cartSchema)