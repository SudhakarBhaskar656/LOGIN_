const jwt =require('jsonwebtoken')
require('dotenv').config()
const genrateToken=(id)=>{
return jwt.sign(id,process.env.JWT_SECRET,{expiresIn:'2hr'})
}
module.exports=genrateToken