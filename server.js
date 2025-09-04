const express=require('express')
const cookieParser = require('cookie-parser');
const cors=require('cors')
const app=express()
app.use(express.json())
app.use(cookieParser())
const dbconnect=require('./config/database')

require("dotenv").config()

app.use(cors({
    origin:"*",
    credentials:true

}))

const PORT=process.env.PORT || 7000

const admiRoute=require('./routes/admin/admin.route')
const userRoute=require('./routes/user/user.route')

app.use('/admin',admiRoute)
app.use('/user',userRoute)

app.get('/',(req,res)=>{
    res.send("Default Route")
})

app.listen(PORT,()=>{
    console.log(`PORT Has Been Started on ${PORT}`)
    dbconnect()
})