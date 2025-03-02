
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretkey = ' NBKFFJBFDKDJLNBJKFVJGFKVK'
const userData= require('../Model/UserModel')
const nodemailer = require('nodemailer');
require('dotenv').config();


exports.register = async(req,res)=>{
  const { email, password,name,role,address,color,phone } = req.body;
  console.log(req.body)

  if(!(name && email && password && role&&address&&color&&phone)){
    return res.status(400).json({msg:"All fields are required"})
  }

  const user = await userData.findOne({email});
  if(user){
    return res.status(400).json({msg:"user already exist"})
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password,salt)


  const Data = {name,
    email,
    password:hashPass,
    role,
    address,
    color,
    phone
   }
  const result = new userData(Data)
  await result.save()


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:587,
    auth: {
      //  user:'uttamftspl@gmail.com',
      //  pass:'wlxj plim jsij fvzv'
      user: "praveenkatewa.45@gmail.com",
      pass:"uhzy ezsr ynmg hsrt"
    }
  });

  const mailOptions = {
    from:"uttamftspl@gmail.com",
    to: email,
    subject: 'Account created successfully',
    text: 'Welcome to Task System'
  };

  transporter.sendMail(mailOptions, (error, info)=>{
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });


  res.status(201).json({msg:"Signup successfully",result})
}




exports.login = async(req,res)=>{
  const {email,password} = req.body;

  const user = await userData.findOne({email})
  if(!user){
    return res.status(404).json({msg:"signup first"})
  }

  const isMatch = bcrypt.compareSync(password,user.password)
  if(!isMatch){
    return res.status(404).json({msg:"invalid password"})
  }

  const token = jwt.sign({_id:user._id},secretkey,{expiresIn:'120h'})

 res.status(200).json({msg:"Login successfully",token})
}


exports.updatePassword=async(req,res)=>{
  const email = req.user.email;
  const {newPassword} = req.body;
  const user= await userData.findOne({email});
  if(!user){
    return res.status(404).json({msg:"user not found"})
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(newPassword,salt)
  await userData.updateOne({email},{$set:{password:hashPass}})
  res.status(200).json({msg:"password updated successfully"})
}

exports.forgotPassword=async(req,res)=>{
  const {email,newPassword} = req.body;
  console.log(req.body)
  // return
  const user= await userData.findOne({email});
  console.log(user) 
  // return
  if(!user){
    return res.status(404).json({msg:"user not found"})
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(newPassword,salt)
  await userData.updateOne({email},{$set:{password:hashPass}});

  const token = jwt.sign({_id:user._id},secretkey,{expiresIn:'120h'})
  res.status(200).json({msg:"password updated successfully",token})
}
