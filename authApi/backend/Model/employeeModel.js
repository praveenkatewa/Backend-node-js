const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const employee = new Schema({
 name:{
  type:String,
  required:true
 },
 userId:{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
  ref:"user"
 },
 code:{
  type:String,
  required:true
 },
 salary:{
  type:String,
  required:false
 },
 experience:{
  type:Number,
  required:false
 },
 skill:{
  type:String,
  required:false
 },
 
},{versionKey:false,timestamps:true})

const employeeData= mongoose.model('employee', employee)

module.exports = employeeData