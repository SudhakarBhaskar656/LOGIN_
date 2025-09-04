const express=require('express')
const route=express.Router()
const {adminSignup ,adminLogin,adminGet,adminDelete,adminUpdate}=require('../../controller/admin/admin.controller')
const verifyAdmin=require('../../middleware/auth')

 route.post('/adminSignup',adminSignup)
 route.post('/adminLogin',adminLogin)
 route.get('/adminGet',verifyAdmin,adminGet)
 route.delete('/adminDelete/:id',adminDelete)
 route.put('/adminUpdate/:id',adminUpdate)
 
 module.exports=route