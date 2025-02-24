const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
   
  },
  email: {
    type: String,
    required: true,
    
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'team_lead', 'developer'],
    default: 'developer'
  },
  address: {
    type: String
  },
  color: {
    type: String
  },
  phone: {
    type: String
  }
  
},{versionKey:false,timestamps:true});


const userData=mongoose.model('User',userSchema)
module.exports=userData



