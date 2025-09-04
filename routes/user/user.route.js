const express=require('express')
const {userSignup,userLogin,userGet,userDelete,userUpdate}=require('../../controller/user/user.controller')
const route=express.Router()

const verifyUser=require('../../middleware/auth')

route.post('/userSignup',userSignup)
route.post('/userLogin',userLogin)
route.get('/userGet' , verifyUser ,userGet)
route.delete('/userDelete/:id',userDelete)
route.put('/userUpdate/:id',userUpdate)


module.exports=route