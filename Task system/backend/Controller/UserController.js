
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretkey = ' NBKFFJBFDKDJLNBJKFVJGFKVK'
const userData= require('../Model/UserModel')


exports.register = async(req,res)=>{
  const {name,email,password,role} = req.body;
  console.log(req.body)

  if(!(name && email && password && role)){
    return res.status(400).json({msg:"All fields are required"})
  }

  const userEmail = await userData.findOne({email});
  if(userEmail){
    return res.status(400).json({msg:"Email already used"})
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password,salt)


  const user = {name,
    email,
    password:hashPass,
    role
   }
  const result = new userData(user)
  await result.save()
  res.status(201).json({msg:"Signup successfully",result})
}



exports.login = async(req,res)=>{
  const {email,password} = req.body;
  // console.log(req.body)
// return
  const userEmail = await userData.findOne({email})
  if(!userEmail){
    return res.status(404).json({msg:"signup first"})
  }

  const isMatch = bcrypt.compareSync(password,userEmail.password)
  if(!isMatch){
    return res.status(404).json({msg:"invalid password"})
  }

  const token = jwt.sign({userId:userEmail._id},secretkey,{expiresIn:'120h'})

 res.status(200).json({msg:"Login successfully",token:token,role:userEmail.role})
}
