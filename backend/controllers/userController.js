




const test = (req,res)=>{
    console.log("test working");
    res.json("In test")
}



const register = (req,res)=>{
    const {name,email,password} = req.body
    console.log(name);
    

} 


module.exports = {
    test,
    register
}


