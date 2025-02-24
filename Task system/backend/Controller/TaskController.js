const taskData = require('../Model/TaskModel')
const userData = require('../Model/UserModel')


exports.createTask = async(req,res)=>{
  const { title,dueDate,status,assignedTo,remark } = req.body;


  if(!(title && dueDate && status && assignedTo && remark)){
    return res.status(400).json({msg:"All fields are required"})
  }


  const task = { title,
    dueDate,
    status,
    assignedBy: req.user.userId,
    assignedTo,
    remark,
   }
   console.log(">>>>>>task>>",task)
  const result = new taskData(task)
  await result.save()
  res.status(201).json({msg:"task given",result})
}


exports.getuser=async(req,res)=>{
  const user = await userData.find()
  res.status(201).json(user)
}




exports.myTasks = async (req, res) => {
    const tasks = await taskData.find({ assignedTo: req.user.userId })
      .populate('assignedBy', 'name')
      .populate('assignedTo', 'name');
  
    res.status(201).json(tasks);
  }


  exports.myAssignedTasks = async (req, res) => {
    const tasks = await taskData.find({ assignedBy: req.user.userId })
      .populate('assignedBy', 'name')
      .populate('assignedTo', 'name');
  
    res.status(201).json(tasks);
  }

