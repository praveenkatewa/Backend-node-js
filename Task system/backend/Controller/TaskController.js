const taskData = require('../Model/TaskModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretkey = ' NBKFFJBFDKDJLNBJKFVJGFKVK'
const userData=require('../Model/UserModel')


exports.createTask = async(req,res)=>{
  const { title, description, assignedTo, deadline } = req.body;


  if(!( title&& description&& assignedTo&& deadline)){
    return res.status(400).json({msg:"All fields are required"})
  }

  const task = { title,
    description,
    assignedBy: req.user.userId,
    assignedTo,
    deadline
   }
  const result = new taskData(task)
  await result.save()
  res.status(201).json({msg:"task given",result})
}


exports.getTasks = async (req, res) => {

    let tasks;
    
    if (req.user.role === 'admin') {
      tasks = await taskData.find()
        .populate('assignedBy', 'name')
        .populate('assignedTo', 'name');
    } else if (req.user.role === 'team_lead') {
      tasks = await taskData.find({ assignedBy: req.user.userId })
        .populate('assignedBy', 'name')
        .populate('assignedTo', 'name');
    } else {
      tasks = await taskData.find({ assignedTo: req.user.userId })
        .populate('assignedBy', 'name')
        .populate('assignedTo', 'name');
    }

    res.status(201).json(tasks);
  
};

exports.updateTask = async (req, res) => {
    const task = await taskData.findByIdAndUpdate(
      req.body);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(201).json(tasks);
  };


