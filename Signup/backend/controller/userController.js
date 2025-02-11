const userdata= require("../model/userModel")
const bcrypt = require('bcrypt')



exports.signUp  = async(req,res)=>{
const {name,email,password} = req.body;
// console.log(name)
if(!name &&  email && password){
  return res.status(400).json({message:'all are required'})
}

const existingemail =await  userdata.findOne({email})
console.log(`>>>>existemail`,existingemail)

if(existingemail){
  return res.status(400).json({message:"email already exists"})
}

const salt=bcrypt.genSaltSync(10);
console.log(`>>>salt`,salt)
const hash= bcrypt.hashSync(password,salt);
console.log(`>>hash>>`,hash)


const data={name,email,password:hash}

const singupdata =new userdata(data)
await singupdata.save()
res.status(201).json(singupdata)
}




exports.login=async (req,res)=>{
  const {email,password}=req.body
  if(!email&& password){
    return res.status(400).json({message:"all are required"})

  }
  const existingemail =await  userdata.findOne({email})
console.log(`>>>>existemail`,existingemail)

if(!existingemail){
  return res.status(400).json({message:"email does not exist"})
}

const dbPassword =existingemail.password
const login= await bcrypt.compare(password,dbPassword)
console.log(">>>login>>",login)

if(login){
  return res.status(200).json({message:"login successfull"})
}
else{
  return res.status(400).json({message:"invalid password"})
}


}