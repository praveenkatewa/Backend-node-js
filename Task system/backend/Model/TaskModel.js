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
    required: true
  },
  remark: {
    type: String,
    required: true
  },
 
 
});



const taskData=mongoose.model('Task', taskSchema);
module.exports=taskData
