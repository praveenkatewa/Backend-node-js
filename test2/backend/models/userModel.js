const mongoose=require('mongoose')

const Schema=mongoose.Schema;

const students= new Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  phone:{
    type:String,
    // required:true
  },
  city:{
    type:String,
   
  },


})

const studentData=mongoose.model("students",students)
module.exports=studentData;