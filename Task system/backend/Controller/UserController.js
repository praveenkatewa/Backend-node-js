
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const secretkey = ' NBKFFJBFDKDJLNBJKFVJGFKVK'
// const userData= require('../Model/UserModel')
// const nodemailer = require('nodemailer');
// const moment = require('moment');
// require('dotenv').config();
// const {fileUpload}=require('../Utility/Clodinary')


// exports.register = async(req,res)=>{
//   const { email, password,name,role,address,color,phone } = req.body;


//   console.log(req.body)

//   if(!(name && email && password && role&&address&&color&&phone)){
//     return res.status(400).json({msg:"All fields are required"})
//   }

//   const user = await userData.findOne({email});
//   if(user){
//     return res.status(400).json({msg:"user already exist"})
//   }

//   // const fileupload=await fileUpload(req.files)

//   let fileUrl = null;
//   if (req.files && req.files.file) {
//     const fileupload = await fileUpload(req.files.file);
//     fileUrl = fileupload[0].url; // Ensure `fileUpload` function returns a URL
//   }

//   const salt = bcrypt.genSaltSync(10);
//   const hashPass = bcrypt.hashSync(password,salt)


//   const Data = {name,
//     email,
//     password:hashPass,
//     role,
//     address,
//     color,
//     phone,
//     // file:fileupload[0].url
//     file: fileUrl, 
//    }
//   const result = new userData(Data)
//   await result.save()


//   const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com',
//     port:587,
//     auth: {
    
//       user: "praveenkatewa.45@gmail.com",
//       pass:"uhzy ezsr ynmg hsrt"
//     }
//   });

//   const mailOptions = {
//     from:"uttamftspl@gmail.com",
//     to: email,
//     subject: 'Account created successfully',
//     text: 'Welcome to Task System'
//   };

//   transporter.sendMail(mailOptions, (error, info)=>{
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });


//   res.status(201).json({msg:"Signup successfully",result})
// }


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretkey = ' NBKFFJBFDKDJLNBJKFVJGFKVK'
const userData= require('../Model/UserModel')
const nodemailer = require('nodemailer');
const moment = require('moment');
require('dotenv').config();
const {FileUpload}=require('../Utility/Clodinary')

exports.register = async (req, res) => {
  try {
    console.log("Received Data:", req.body);

    // Validate required fields
    const { email, password, name, role, address, color, phone } = req.body;
    if (!(name && email && password && role && address && color && phone)) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await userData.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Handle file upload
    let fileUrl = null;
    if (req.files && req.files.file) {
      const fileupload = await FileUpload(req.files);
      if (fileupload && fileupload.length > 0) {
        fileUrl = fileupload[0].url;
      }
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    // Save user to DB
    const newUser = new userData({
      name,
      email,
      password: hashPass,
      role,
      address,
      color,
      phone,
      file: fileUrl, // Store file URL if available
    });

    await newUser.save();

    // Send confirmation email
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user:'praveenkatewa.45@gmail.com', // Use environment variables
        pass: 'uhzy ezsr ynmg hsrt' // Use environment variables
      }
    });

    const mailOptions = {
      from:'praveenkatewa.45@gmail.com',
      to: email,
      subject: "Account created successfully",
      text: "Welcome to Task System",
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ msg: "Signup successful", user: newUser });

  } catch (error) {
    console.error("Error in register function:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

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
  const {email,newPassword,otp} = req.body;

  console.log(req.body)
  // return
  const user= await userData.findOne({email});
  console.log(user) 
  // return
  if(!user){
    return res.status(404).json({msg:"user not found"})
  }
const dbotp = user.otp;
const otpExpire = user.otpExpire;
console.log("DBOTP>>>",dbotp,otp)
if(dbotp!=otp){
  return res.status(404).json({msg:"invalid otp"})
}
if(moment().isAfter(otpExpire)){
  return res.status(404).json({msg:"otp expired"})
}

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(newPassword,salt)
  await userData.updateOne({email},{$set:{password:hashPass}});

  const token = jwt.sign({_id:user._id},secretkey,{expiresIn:'120h'})
  res.status(200).json({msg:"password updated successfully",token})




}

exports.getOtp=async(req,res)=>{
  const {email} = req.body;
  const user= await userData.findOne({email});  
  if(!user){
    return res.status(404).json({msg:"user not found"})
  } 
  const otp = Math.floor(1000 + Math.random() * 9000);
  const otpExpire = moment().add(10, 'minutes');
  console.log("OTP>>>",otp,otpExpire)
   await userData.updateOne({email},{$set:{otp,otpExpire}})
  res.status(200).json({msg:"OTP sent successfully"})


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:587,
    auth: {
    
      user: "praveenkatewa.45@gmail.com",
      pass:"uhzy ezsr ynmg hsrt"
    }
  });

  const mailOptions = {
    from:"praveenkatewa.45@gmail.com",
    to: email,
    subject: 'Account created successfully',
    text: `Your OTP is ${otp}`
  };

  transporter.sendMail(mailOptions, (error, info)=>{
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

