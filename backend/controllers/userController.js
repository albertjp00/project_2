const User = require('../models/user')




const test = (req,res)=>{
    console.log("test working");
    res.json("In test")
}


const login = async (req,res) =>{
    console.log(req.body);
    
    const {email,password} = req.body

    const user = await User.findOne({email})

    if(user){
        if(user.password == password){
            return res.json(user)
        }else{
            return res.json({message:"Password is incorrect"})
        }
    }else{
        return res.json({message:"Email is incorrect"})
    }
}


const register = async (req,res)=>{
    try {
        console.log(req.body);
        
        const {name,email,password} = req.body

        // const existingUser = await User.find({email})
        

        // if(existingUser){
        //     console.log("user exists");

        //     return res.status(400).json({message:'User already exists'})
        // }

        const user = new User({name,email,password})
        await user.save()

        return res.json(user)



    } catch (error) {
        
    }
    

    
    
    
} 


module.exports = {
    test,
    login,
    register
}


