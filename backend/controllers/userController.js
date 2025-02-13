const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const Order = require('../models/order')
require('dotenv').config()





// User Login
const login = async (req,res) =>{
    try {
    
    const {email,password} = req.body
    console.log(password);
    

    const user = await User.findOne({email})

    if(!user){
        return res.json({message:"Invalid Email"})
    }

    const valid = await bcrypt.compare(password,user.password)
    
    

    
        if(valid){
            const token = jwt.sign({userId : user._id},process.env.secret_key,{expiresIn:'1h'})

            res.cookie("token",token,{
                httpOnly:true
            })

            console.log(req.cookie);
            
            console.log(user.password);

            
            
            return res.json({success:true})
        }else{
            return res.json({success:false,message:"Incorrect Password"})
        }
    
    } catch (error) {
        console.log(error);
        
    }
}

// User register
const register = async (req,res)=>{
    try {
        console.log(req.body);
        
        const {name,email,password} = req.body

        const existingUser = await User.findOne({email:email})
        console.log(existingUser);
        

        if(existingUser){
            console.log("user exists");

            res.json({success:false,message:'User already exists'})
        }

        const hash = 10
        const hashedPassword = await bcrypt.hash(password,hash)
        const user = new User({name,email,password:hashedPassword})
        await user.save()

        return res.json({success:true,message:"Registration Succesfull"})



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

        let token = req.cookies.token
        
        let decoded  =   jwt.decode(token,process.env.secret_key)
        let userId = decoded.userId
        const cartData = await Cart.find({userId})
        
        
        
        res.json({success:true,cartData:cartData})
    } catch (error) {
        console.log(error);
        
    }
}

const cartAdd = async (req,res)=>{
    try {
        let productId = req.body.itemId

        const token = req.cookies.token
        
        
        
        const decoded = jwt.decode(token,process.env.secret_key)
        console.log(decoded.userId);
        let userId = decoded.userId
        
        
        let cartItem = await Cart.findOne({userId,productId})
        console.log("cartItemssssss",cartItem);
        
        if(!cartItem){
            cartItem = new Cart({
                userId:userId,
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

const placeOrder = async (req,res)=>{

    const token = req.cookies.token
    const decoded = jwt.decode(token,process.env.secret_key)
    let userId = decoded.userId

    let orderData = req.body
    console.log(orderData.items);

    let order = await Order.findOne({userId})

    if(!order){
        let order = await Order({
            userId:userId,
            items:req.body.items,
            amount : req.body.amount,
            address: req.body.address
        })
        order.save()
    }else{
        order.amount = req.body.amount
        order.items = req.body.items
        order.address = req.body.address
        
    }
    await order.save()
    
    console.log(order);
    


}

const myOrders = async (req,res)=>{

    let token = req.cookies.token
    let decoded = jwt.decode(token,process.env.secret_key)
    let userId =  decoded.userId

    let orders = await Order.find({userId})

    // console.log(order);
    res.json({success:true,orders:orders})
}


module.exports = {
  
    login,
    register,
    getProducts,
    cartAdd,
    loadCart,
    cartRemove,
    placeOrder,
    myOrders
}


