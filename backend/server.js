const express = require("express")


const app = express()

const http = require("http")

const path= require('path')

const port = 2000

const cors = require('cors')

const mongoose = require('mongoose')
    
const dotenv = require('dotenv').config()

const server = http.createServer(app)

const socketIo = require("socket.io")


const io = socketIo(server,{
    cors:{
        origin:"http://localhost:5173",
        methods : ["GET","POST"]
    }
})

io.on("connection",(socket)=>{
    console.log("New CLient Connected",socket.id);

    socket.on("disconnect",()=>{
        console.log("Client disconnected",socket.io);
    })
    
})

app.set("socket.io",io)

const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.use(express.json())

const userRoute = require('./routes/userRoute')

const adminRoute = require('./routes/adminRoute')


adminRoute.use('/image',express.static(path.join(__dirname,'uploads')))

userRoute.use('/image',express.static(path.join(__dirname,'uploads')))

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Database connected"))
.catch((err) =>console.log('Database Not connected',err))


app.use(cors({
    origin: 'http://localhost:5173',
    credentials : true
}))




app.use('/user',userRoute)

app.use('/admin',adminRoute)

server.listen(port,()=>{
    console.log("started");
    
})