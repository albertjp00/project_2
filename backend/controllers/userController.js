const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')


const test = (req,res)=>{
    console.log("test working");
    res.json("In test")
}


const login = async (req,res) =>{
    try {
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
    } catch (error) {
        console.log(error);
        
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
        console.log(error);
        
    }
    
}

const getProducts  = async (req,res)=>{
    try {
        console.log("getting");
        
        let products = await Product.find({})
        res.json({success:true,products:products})
    } catch (error) {
        console.log(error);
        
    }
}


const loadCart = async (req,res) =>{
    try {

        let userId  = 1 
        const cartData = await Cart.find({userId})
        
        
        res.json({success:true,cartData:cartData})
    } catch (error) {
        console.log(error);
        
    }
}

const cartAdd = async (req,res)=>{
    try {
        let productId = req.body.itemId
        let userId = 1
        
        
        let cartItem = await Cart.findOne({productId:productId})
        if(!cartItem){
            cartItem = new Cart({
                userId,
                productId:productId,
                quantity:req.body.quantity
            })
            await cartItem.save()
        }else{
            cartItem.quantity = req.body.quantity
            await cartItem.save()
        }
        
        console.log("cartItem",cartItem);
        res.json({success:true})
        
    } catch (error) {
        console.log(error);
        
    }
} 


const cartRemove = async (req,res)=>{
    try {
        console.log("body",req.body);
        
        let id = req.body.itemId
        let quantity = req.body.quantity
        
        if(quantity === 0){
            let cart = await Cart.deleteOne({productId:id})
            
            
            
        }else{
            let cart = await Cart.findOne({productId:id})
            cart.quantity -=1
            await cart.save()
        }
        
        res.json({success:true})

    } catch (error) {
        console.log(error);
        
    }
}



module.exports = {
    test,
    login,
    register,
    getProducts,
    cartAdd,
    loadCart,
    cartRemove
}


