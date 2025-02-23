const jwt = require('jsonwebtoken')
const secretkey = ' NBKFFJBFDKDJLNBJKFVJGFKVK'
const userData=require('../Model/UserModel')

exports.auth = async(req,res,next) =>{

  const token = req?.headers?.authorization;
  console.log("....>>>>.Token >>>>",token)
  if(!token){
    return res.status(401).json({massage:"Unauthorizan"});
  }

  const splitToken = token.split(" ")[1]
  console.log(">>>>>>SplitToken>>>",splitToken)
  
  
  const decode = jwt.verify(splitToken,secretkey)
  console.log(">>>>Decode>>>",decode)
  if(!decode){
    return res.status(401).json({massage:'invalid token'});
  }
  const user = await userData.findById(decode._id)
  console.log(">>>>>>decode>>>>",user)
  if(!user){
    return res.status(401).json({massage:'user not found'})

  }
  req.user=user;
next()
};


exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        message: 'You do not have permission to perform this action' 
      });
    }
    next();
  };
};
