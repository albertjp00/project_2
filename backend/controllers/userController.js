const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const Order = require('../models/order')
require('dotenv').config()

const axios = require('axios')


const razorpay = require('razorpay')

const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

const crypto = require('crypto')


// User Login
const login = async (req,res) =>{
    try {
    
    const {email,password} = req.body
    

    const user = await User.findOne({email})

    if(!user){
        return res.json({message:"Invalid Email"})
    }

    const valid = await bcrypt.compare(password,user.password)
    
    

    
        if(valid){
            const token = jwt.sign({userId : user._id},process.env.secret_key,{expiresIn:'1h'})
            
            return res.json({success:true,token:token})
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
        
        let products = await Product.find()
        res.json({success:true,products:products})
    } catch (error) {
        console.log(error);
    }
}


const loadCart = async (req,res) =>{
    try {

        let token = req.query.t
        
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

        const token = req.body.t
        
        
        
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
        let token = req.body.t

        let decoded = jwt.decode(token,process.env.secret_key)
        let userId = decoded.userId

        if(quantity === 0){
            let cart = await Cart.deleteOne({userId:userId,productId:id})
            
            
            
        }else{
            let cart = await Cart.findOne({userId:userId,productId:id})
            cart.quantity -=1
            await cart.save()
        }
        
        res.json({success:true})

    } catch (error) {
        console.log(error);
        
    }
}

const placeOrder = async (req, res) => {
    try {
        
        console.log(req.body);
        
        let token = req.body.t
        
        let decoded  =   jwt.decode(token,process.env.secret_key)
        let userId = decoded.userId

        
        const { orderData } = req.body;
        if (!orderData || !orderData.items || !orderData.address) {
            return res.status(400).json({ success: false, message: "Missing order data" });
        }

        console.log("Received Order Data:", orderData);

        
        let order = await Order.findOne({ userId: userId, status: "Food Processing" });

if (order) {
    order.items = orderData.items;
    order.amount = orderData.amount;
    order.address = orderData.address;
    await order.save();
} else {
    order = new Order({
        userId: userId,
        items: orderData.items,
        amount: orderData.amount,
        address: orderData.address,
    });

    await order.save();
}

        // Deleteing Cart
        await Cart.findOneAndDelete({ userId: userId });

        
        // console.log("Order Placed Successfully:", newOrder);

        if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
            console.log("key required");
            
            return res.status(500).json({ success: false });
        }

        // Razorpay Order
        const options = {
            amount: orderData.amount * 100, // Convert amount to paise
            currency: "INR",
            receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`,
        };

        const razorpayOrder = await razorpayInstance.orders.create(options);

        return res.json({ success: true, order, razorpayOrder });
    } catch (error) {
        console.error("Error in placeOrder:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};



const verifyPayment =  async (req, res) => {
    try {
        console.log("verify");
    
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;
  
    const secret = process.env.RAZORPAY_KEY_SECRET;
    const generated_signature = crypto
      .createHmac("sha256", secret)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");
  
    if (generated_signature === razorpay_signature) {
      res.json({ success: true, message: "Payment verified successfully" });
    } else {
      res.json({ success: false, message: "Invalid signature" });
    }
    } catch (error) {
        console.log(error);
        
    }
  };


const payonline = async (res,req)=>{
    try {
        const token = req.cookies.token
    const decoded = jwt.decode(token,process.env.secret_key)
    let userId = decoded.userId



    let orderData = req.body
    console.log(orderData);



    let order = await Order.findOne({userId:userId})
    

    if(!order){
        let order = await Order({
            userId:userId,
            items:req.body.items,
            amount : req.body.amount,
            address: req.body.address
        })
        await order.save()
    }else{
        order.amount = req.body.amount
        order.items = req.body.items
        order.address = req.body.address

    }
    await order.save()

    let cartDelete = await Cart.findOneAndDelete({userId:userId})
    
    console.log(order);

    const options = {
        amount: req.body.amount * 100, // Amount in paise (₹1 = 100 paise)
        currency: "INR",
        receipt: `order_rcptid_${Math.floor(Math.random() * 10000)}`,
      };
  
      const razorpayOrder = await razorpay.orders.create(options);
      res.json({ success: true, orders:razorpayOrder });

        
    } catch (error) {
        console.log(error);
        
    }
}

const myOrders = async (req,res)=>{

    let token = req.query.t

    let decoded = jwt.decode(token,process.env.secret_key)
    let userId =  decoded.userId
    
    
    let orders = await Order.find({userId})
    

    // console.log(order);
    res.json({success:true,orders:orders})
}


const chatbot = async (req, res) => {
    try {
      const { message } = req.body;
      console.log("Received Message:", message);

      const API_KEY = process.env.API_KEY

      const customPrompt = `
      You are a chatbot for a food delivery service called 'Tomato'. 
      Your goal is to assist customers with ordering food, tracking deliveries, and answering menu-related questions. 
      Keep responses friendly, helpful, and focused on food delivery.
      
      User: ${message}`
    ;
  
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: customPrompt }] }]
        }
      );
  
      console.log("Full API Response:", JSON.stringify(response.data, null, 2));
  
      
      const replyParts = response.data.candidates?.[0]?.content?.parts;
      const reply = replyParts ? replyParts.map(part => part.text).join(" ") : "Sorry, I couldn't understand that.";
  
      res.json({ reply });
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      res.status(500).json({ error: "Failed to fetch response" });
    }
  };
  


module.exports = {
  
    login,
    register,
    getProducts,
    cartAdd,
    loadCart,
    cartRemove,
    placeOrder,
    verifyPayment,
    myOrders,
    chatbot
}


