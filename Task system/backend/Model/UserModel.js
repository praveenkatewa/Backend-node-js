const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
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
  createdAt: {
    type: Date,
    default: Date.now
  }
},{versionKey:false,timestamps:true});


const userData=mongoose.model('User',userSchema)
module.exports=userData



