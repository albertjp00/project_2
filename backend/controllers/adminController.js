const  Product = require("../models/product");




const addProduct = async (req,res)=>{
    try {
        console.log("adding");
        
        const {name,description,price,category} = req.body

        const image = req.file.filename

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

module.exports ={
    addProduct
}