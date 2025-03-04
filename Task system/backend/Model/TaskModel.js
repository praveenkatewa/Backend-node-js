const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  
  },
  dueDate: {
    type: Date,
    required: true
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    required: true  //ENUM
  },
  remark: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true, // false means task is in trash
  }
 
 
});



const taskData=mongoose.model('Task', taskSchema);
module.exports=taskData
