

const taskData = require('../Model/TaskModel')
const userData = require('../Model/UserModel')
const trashData= require('../Model/TrashModel')


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
      console.log(">>>>>>tasks>>>>>",tasks)
  
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
      res.status(500).json({ msg: "Server error" });
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
    
      res.status(500).json({ msg: "Server error"});
    }
  };
  







  exports.completeTask = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from URL params

        if (!id) {
            return res.status(400).json({ msg: 'Task ID is required' });
        }

        const task = await taskData.findById(id);
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        // Move task to trash collection
        const completedTask = new trashData({
            title: task.title,
            dueDate: task.dueDate,
            status: 'Completed',  // Keep status as 'Completed'
            assignedBy: task.assignedBy,
            assignedTo: task.assignedTo,
            remark: task.remark,
            isActive: false, // Indicates task is inactive (trashed)
        });

        await completedTask.save(); // Save to trash collection
        await taskData.findByIdAndDelete(id); // Remove from active tasks

        return res.status(200).json({ msg: 'Task marked as completed and moved to trash' });

    } catch (error) {
        console.error('Error completing task:', error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};



// Get all trashed tasks
exports.getTrashTasks = async (req, res) => {
  try {
      const trashedTasks = await trashData.find();
      res.status(200).json(trashedTasks);
  } catch (error) {
      console.error("Error fetching trash tasks:", error);
      res.status(500).json({ msg: "Internal Server Error" });
  }
};

// Restore a task from trash
exports.restoreTask = async (req, res) => {
  try {
      const { id } = req.params;

      const task = await trashData.findById(id);
      if (!task) {
          return res.status(404).json({ msg: "Task not found in trash" });
      }

      // Restore task back to active collection
      const restoredTask = new taskData({
          title: task.title,
          dueDate: task.dueDate,
          status: 'Pending',  // Reset status if needed
          assignedBy: task.assignedBy,
          assignedTo: task.assignedTo,
          remark: task.remark,
          isActive: true,
      });

      await restoredTask.save();  // Save back to active tasks
      await trashData.findByIdAndDelete(id);  // Remove from trash

      res.status(200).json({ msg: "Task restored successfully" });
  } catch (error) {
      console.error("Error restoring task:", error);
      res.status(500).json({ msg: "Internal Server Error" });
  }
};







// exports.CompetedTask = async (req, res) => {
//   try {
//       const trashedTasks = await trashData.find();
//       res.status(200).json(trashedTasks);
//   } catch (error) {
//       console.error("Error fetching trash tasks:", error);
//       res.status(500).json({ msg: "Internal Server Error" });
//   }
// };
