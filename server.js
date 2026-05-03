const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5001
const cors = require('cors')
app.use(express.json())
const MongoURL = "mongodb://localhost:27017/crud" 
mongoose.connect(MongoURL)
.then(()=>{
    console.log("mongoose is connected")
})
.catch((err)=>{
    console.log(`error ${err}`)
})
app.use(cors())
const userRoute = require("./routes/userRoutes");
app.use("/",userRoute)

app.listen(PORT,()=>{
    console.log(`Server is running on the ${PORT}`)
})

