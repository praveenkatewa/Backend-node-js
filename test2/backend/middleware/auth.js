const jwt = require('jsonwebtoken')

const studentData = require('../models/userModel')

module.exports = async(req,res,next) =>{

  const token = req?.headers?.authorization;
  
  if(!token){
    return res.status(401).json({massage:"Unaut"});
  }
  const splitToken = token.split(" ")[1]
  
  const decode = jwt.verify(splitToken,secretkey)

  if(!decode){
    return res.status(401).json({massage:'invalid token'});
  }
  const user = await studentData.findById(decode._id)
  console.log(">>user data",user)
  if(!user){
    return res.status(401).json({massage:'user not found'})

  }
  next() 
}