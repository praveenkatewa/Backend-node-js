const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const studentData = require('../models/userModel')
const secretkey = 'gbgkjbnrtjkgnrkjvrjvvkjrv'

exports.signup=async(req,res)=>{
  const{name,email,password}=req.body;


  if(!(name && email&& password)){
    return res.status(401).json({msg:"field are required"})
  }
  const userEmail = await studentData.findOne({email});
  if(userEmail){
    return res.status(400).json({msg:"Email alread"})
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password,salt)
  const data = {name,email,password:hashPass}
  const result = new studentData(data)
  
  await result.save()
  res.status(201).json({msg:"Sign",result})

}
exports.login = async(req,res)=>{
  const {email,password} = req.body;
  const userEmail = await studentData.findOne({email})
  if(!userEmail){
    return res.status(404).json({msg:"signup first"})
  }
  const isMatch = bcrypt.compareSync(password,userEmail.password)
  if(!isMatch){
    return res.status(404).json({msg:"invalid password"})
  }
  const token = jwt.sign({_id:userEmail._id},secretkey,{expiresIn:'1h'})
 res.status(200).json({msg:"Login ",token:token})
}


exports.studentCreate = async(req,res)=>{
console.log("..>>req.body",req.body)
const {name,email,password,phone,city} = req.body;
if(!(name&&email&&password&&phone&&city)){
  return res.status(404).json({msg:"all  requird"})
}
const userEmail = await studentData.findOne({ email });
if (userEmail) {
  return res.status(400).json({ msg: "email  used" });
}
const userdata = new studentData(req.body)
await userdata.save()
return res.status(201).json(userdata)
} 


exports.findAll = async(req,res)=>{
  const myStudentData = await studentData.find()
  res.status(200).json(myStudentData)
  console.log(myStudentData)
}


