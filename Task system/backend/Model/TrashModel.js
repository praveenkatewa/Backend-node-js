const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskTrashSchema = new Schema({
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
 
  isActive: {
    type: Boolean,
    default: false, // false means task is in trash
  }
});

const trashData = mongoose.model('TaskTrash', taskTrashSchema);
module.exports = trashData;

