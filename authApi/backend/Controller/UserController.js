const studentData = require('../Model/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretkey = 'dv5v45g455eer34ff5tt545ge34'
const employeeData=require('../Model/employeeModel')
const generateOTP =require('../Helper/otp')
const moment= require('moment');

const nodemailer=require('nodemailer')
require('dotenv').config();


exports.signUp = async(req,res)=>{

  // const fileUploadData=await uploadFile(req.files)
  const {name,email,password} = req.body;
  console.log(req.body)


  if(!(name&&email&&password)){
    return res.status(400).json({msg:"All fields are required"})
  }

  const userEmail = await studentData.findOne({email});
  if(userEmail){
    return res.status(400).json({msg:"Email already used"})
  }

  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password,salt)

  const { otp, expiryTime } = generateOTP(); 


  const data = {name,email,password:hashPass,OTP:otp,OTPExpiryTime: expiryTime}
  const result = new studentData(data)
  await result.save()
  res.status(201).json({msg:"Signup successfully",result})
}

exports.login = async(req,res)=>{
    const {email,password,OTP} = req.body;
    const userEmail = await studentData.findOne({email})
    // console.log(userEmail)
    // return;

    if(!userEmail){
      return res.status(404).json({msg:"signup first"})
    }
    const userOTP= await studentData.findOne({OTP})
    if (userOTP.OTP !== OTP) {
      return res.status(400).json({ msg: "Invalid OTP" });
  }

    const isMatch = bcrypt.compareSync(password,userEmail.password)
    if(!isMatch){
      return res.status(404).json({msg:"invalid password"})
    }
    const token = jwt.sign({_id:userEmail._id},secretkey,{expiresIn:'1h'})

   res.status(200).json({msg:"Login successfully",token:token})
}




exports.studentCreate = async(req,res)=>{
  console.log("......>>>>req.body",req.body)
  const {name,email,number} = req.body;
  if(!(name&&email&&number)){
    return res.status(404).json({msg:"all feild requird"})
  }
  const userEmail = await studentData.findOne({ email });
  if (userEmail) {
    return res.status(400).json({ msg: "Email already used" });
  }
  const userdata = new studentData(req.body)
  await userdata.save()
  return res.status(201).json(userdata)
} 







// exports.sendMail = async(req,res)=>{  
  
//   console.log(">>>>>body sendemail>>>",req.body)

//   const transporter = nodemailer.createTransport({
//     host:'smtp.gmail.com',
//     auth:{
//       user:process.env.Email_User,
//       pass:process.env.Email_password
//     }
//   });

//   const info= await transporter.sendMail({
//     from:process.env.Email_User,
//     to:req.body.to,
//     subject:req.body.subject,
//     text:req.body.text,
//     html:"<b>hello nodemailer</b>"
//   });

// }
// console.log("Message sent: %s", info);
// console.log("Preview URL: %s",info);
// if(info.messageId){ 
// res.status(200).json({msg:"Email sent successfully TO  ${req.body.to}"})
// }




// exports.sendMail = async (req, res) => {
// const {to,subject,text} = req.body;
//     console.log(">>>>> body sendemail >>>", req.body);
// // return
//     const info=await this.sendGmail(to,subject,text)

//     if(info.messageId){
//       return res.status(200).json({msg:`Email sent successfully TO ${req.body.to}`})
//     }}


// exports.sendGmail=async(to,subject,text)=>{
//   const transporter = nodemailer.createTransport({
//     host:'smtp.gmail.com',
//     port:587,
//     auth:{
//       user:process.env.Email_User,
//       pass:process.env.Email_password
//     }
//   });
//   const info= await transporter.sendMail({
//     from:process.env.Email_User,
//     to:to,
//     subject:subject,
//     text:text,
//     html:"<b>hello nodemailer</b>"
//   });
// }



exports.sendMail = async (req, res) => {
    const { to, subject, text } = req.body;
    console.log(">>>>> body sendemail >>>", text);

    try {
        const info = await sendGmail(to, subject, text); // Use exports.sendGmail to correctly reference the function


        if (info.messageId) {
            return res.status(200).json({ msg: `Email sent successfully TO ${req.body.to}` });
        } else {
            return res.status(500).json({ msg: "Failed to send email" });
        }
    } catch (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ msg: "Error sending email", error: error.message });
    }
};

const sendGmail =  async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Use true for port 465, false for other ports
        auth: {
            user: 'praveenkatewa.45@gmail.com',
            pass: 'uhzy ezsr ynmg hsrt',
        },
    });

    const info = await transporter.sendMail({
        from: 'praveenkatewa.45@gmail.com',
        to: to,
        subject: subject,
        text: text,
        // html: "<b>hello nodemailer</b>",
    });

    return info; // Return the result
};



exports.findAll = async(req,res)=>{
    // const myStudentData = await studentData.find()
    // console.log(myStudentData)
    // return;

    // res.status(200).json(myStudentData)

    // console.log(myStudentData)
    // console.log(req.user);
    // return;


    const user_id=req.user._id;
    console.log(">>>>user_id>>>",user_id)
    // return

    // (1)  it find that id which connect userid  
    // const myemployeeData =await employeeData.find({userId:user_id}).populate('userId')
    
    // (2) it find all id here 
    const myemployeeData =await employeeData.find().populate('userId')

    res.status(200).json(myemployeeData)

    console.log(myemployeeData)
}

exports.getOne = async(req,res)=>{
  console.log(req.params)

    const {id} = req.params
    // const myStudentData = await studentData.findById(id)
    const myStudentData = await studentData.findOne({_id:id})
    if(!myStudentData){
      return res.status(404).json({error:'Record not found'})
    }
    res.status(200).json(myStudentData)
    console.log(myStudentData)
}

exports.update = async(req,res)=>{
  console.log(req.body)
  // return;
  const {_id} = req.body;
  console.log({_id})
  // return;
  const updateData = req.body;
  const result = await studentData.findByIdAndUpdate(_id, updateData, { new: true })
  if(!(result)){
    return res.status(404).json({msg:"record not found"})
  }
  res.status(200).json({msg:"data updated",result})
}

exports.delete = async(req,res)=>{
  const {id} = req.params;
  console.log('.....ID...>',id)
  const newData = await studentData.findByIdAndDelete(id)
  if(!(newData)){
    res.status(404).json({msg:"recod not found"})
  }
  res.status(200).json({msg:"Data deleted",newData})
}



// (1)when create by send data by body

// exports.createemployee = async(req,res)=>{
//   console.log("......>>>>req.body",req.body)
//   const {name,email,salary, experience} = req.body;
//   if(!(name)){
//     return res.status(404).json({msg:"all feild requird"})
//   }
//   const employeeData = new employeeModel(req.body)
//   console.log(">>>data>>",employeeData)
//   await employeeData.save()
//   res.status(201).json(employeeData)

// }



// (2) when we pass login id 

exports.createemployee = async(req,res)=>{
  console.log(`>>>req.user>>`,req.user);
  const userId=req.user._id
  console.log(`>>>>userId>>`,userId)

  const {name,email,salary,code,exprerience} = req.body;
  if(!(name)){
    return res.status(404).json({msg:"all feild requird"})
  }

  const data={
    userId,name,email,code,exprerience,salary
  }
  const employeeData = new employeeModel(data)
  console.log(">>>data>>",employeeData)
  await employeeData.save()
  res.status(201).json(employeeData)

}



exports.getemployee=async(req,res)=>{
  console.log(">>>>>get employye",req.user)
  const userId=req.user._id

 const userData= await  employeeModel.find({userId})
 console.log(">>>userdata",userData)

 res.status(201).json(userData)

}



