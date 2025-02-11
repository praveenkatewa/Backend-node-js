const mongoose =require('mongoose')
const Schema =  mongoose.Schema;

const userModel= new Schema ({
  name:{
    type:"string",
    require:true
  },
  email:{
     "type":"string",
  require:true
  },
  password:{
    "type":"string",
    require:true
  }

})

const userSignup =mongoose.model("users",userModel)
module.exports=userSignup