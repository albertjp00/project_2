const  Product = require("../models/product");
const Order = require('../models/order');
const Coupon = require('../models/coupon')



const addProduct = async (req,res)=>{
    try {
        console.log("adding");
        
        const {name,description,price,category} = req.body

        const image = req.file.filename

        const existing = await Product.findOne({name})
        console.log(existing);
        
        if(existing){
            return res.json({success:false,message:"product already exists"})
        }

        const newProduct = {
            name,description,price,category,image
        }

        const product = await Product.create(newProduct)

        console.log(product);
        

        res.status(201).json({success:true,message:"Product added succesfully"})
        
    } catch (error) {
        console.log(error);
        
    }
}


const getList = async (req,res)=>{

    const products = await Product.find()
   
    res.json({success:true,products:products})
    
}

const unlist = async  (req,res) =>{
    let id = req.query.id
    console.log(id);
    

    const unlist = await Product.findByIdAndUpdate(id,{status:"unlisted"})

    res.json({success:true})
    
}

const listItem = async  (req,res) =>{
    let id = req.query.id
    console.log(id);
    

    const list = await Product.findByIdAndUpdate(id,{status:"listed"})

    res.json({success:true})
    
}

const getEdit = async(req,res)=>{
    let id = req.query.id
    console.log(id);
    
    const product = await Product.findById(id)

    res.json({success:true,product:product})
}

const editItem = async (req,res)=>{
    try {
        let id = req.query.id
    
    
    const {name,description,price,category}  = req.body
    let product = await Product.findById(id)

    product.name = name
    product.description = description
    product.price = price
    product.category = category

    if(req.file){
        product.image = req.file.filename
    }
    await product.save()
    

    res.json({success:true})

    } catch (error) {
        console.log(error);
        
    }

}


const listOrders = async (req,res)=>{
    try {
        // console.log("orderss");
        
        let orders = await Order.find()
    console.log(orders);
    

    if(orders){
        res.json({success:true,orders:orders})
    }
    } catch (error) {
        console.log(error);
           
    }
}

const updateStatus = async (req,res)=>{
    try {
        let id = req.body.orderId
        
        let order = await Order.findById(id)

        order.status = req.body.status

        await order.save()
        
        const io = req.app.get("socket.io")

        io.emit("updatedStatus",order)

        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Something went wrong"})
        
    }
}


const addCoupon = async (req,res)=>{
    try {
        const {name,amount} = req.body

        let coupon = await Coupon.findOne({name})

        if(!coupon){
            await Coupon.create({name,amount})
            res.json({success:true,message:"Coupon Created"})
        }else{
            res.json({success:false,message:"Coupon Exists"})
        }

    console.log(req.body);
    } catch (error) {
        console.log(error);
        
    }
    
}


const getCoupon = async (req,res)=>{
    try {
        let coupon = await Coupon.find({})
        

        res.json({coupon:coupon})
        
    } catch (error) {
        console.log(error);
        
    }
  }

module.exports ={
    addProduct,
    getList,
    unlist,
    listItem,
    editItem,
    getEdit,
    listOrders,
    updateStatus,
    addCoupon,
    getCoupon
}