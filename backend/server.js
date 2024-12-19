const express = require("express")


const app = express()

const port = 2000

const cors = require('cors')

const {mongoose} = require('mongoose')

const dotenv = require('dotenv').config()

const userRoute = require('./routes/userRoute')


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database connected"))
.catch((err) =>console.log('Database Not connected',err))


app.use(cors({
    origin: 'https://localhost:5173',
    credentials : true
}))




app.use('/home',userRoute)

app.listen(port,()=>{
    console.log("started");
    
})