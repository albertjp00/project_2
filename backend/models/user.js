const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        requried:true
    },
    password:{
        type:String,
    },

    googleId : {
        type:String,
        unique : true,
        sparse: true,
        default:"nill"
    },
    coupon:[{
        code:{
            type:String
        }
    }]
            
})

module.exports=mongoose.model('user',userSchema)