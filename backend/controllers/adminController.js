const  Product = require("../models/product");




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
    

    const unlist = await Product.findByIdAndDelete(id)

    res.json({success:true})
    
}



module.exports ={
    addProduct,
    getList,
    unlist,
}