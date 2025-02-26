

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
    console.log(req.user)
    const tasks = await taskData.find({ assignedBy: req.user.userId })
      .populate('assignedBy', 'name')
      .populate('assignedTo', 'name');
  
    res.status(201).json(tasks);
  }


  // Update Task (Only Assigned By User Can Update)
  exports.updateTask = async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const userId = req.user.userId; // Authenticated user ID
  
      if (!updates) return res.status(400).json({ msg: "No updates provided" });
  
      const task = await taskData.findOneAndUpdate(
        { _id: id, assignedBy: userId },  // Ensure user is assignedBy
        updates,
        { new: true }
      );
  
      if (!task) return res.status(403).json({ msg: "Unauthorized or Task not found" });
  
      res.status(200).json({ msg: "Task updated successfully", task });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error", error: error.message });
    }
  };
  
  // Delete Task (Only Assigned By User Can Delete)
  exports.deleteTask = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.userId; // Authenticated user ID
  
      const task = await taskData.findOneAndDelete({ _id: id, assignedBy: userId });
  
      if (!task) return res.status(403).json({ msg: "Unauthorized or Task not found" });
  
      res.status(200).json({ msg: "Task deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error", error: error.message });
    }
  };
  