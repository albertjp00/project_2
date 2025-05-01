const mongoose=require("mongoose")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },

    // googleId : {
    //     type:String,
    //     unique:true,
    //     sparse:true
    // },
    
    coupon:[{
            type:String
    }]
            
})

module.exports=mongoose.model('user',userSchema)