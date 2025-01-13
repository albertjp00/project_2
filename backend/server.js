const express = require("express")


const app = express()

const port = 2000

const cors = require('cors')

const {mongoose} = require('mongoose')

const dotenv = require('dotenv').config()

const userRoute = require('./routes/userRoute')

const adminRoute = require('./routes/adminRoute')


mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database connected"))
.catch((err) =>console.log('Database Not connected',err))


app.use(cors({
    origin: 'http://localhost:5173',
    credentials : true
}))




app.use('/',userRoute)

app.use('/admin',adminRoute)

app.listen(port,()=>{
    console.log("started");
    
})