

const taskData = require('../Model/TaskModel')
const userData = require('../Model/UserModel')
const trashData= require('../Model/TrashModel')
const nodemailer=require('nodemailer')
const {excelFileRead} = require('../Utility/ExcelFileUpload')
const moment = require('moment')


exports.createTask = async(req,res)=>{
  const { title,dueDate,status,assignedTo,remark } = req.body;


  if(!(title && dueDate && status && assignedTo && remark)){
    return res.status(400).json({msg:"All fields are required"})
  }


  const assingtoData = await userData.findById(assignedTo)
  if(!assingtoData){
    return res.status(400).json({msg:"User not found"})
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

const taskAssignedToday=await taskData.countDocuments({
  assignedTo:assingtoData._id,
  createdAt: { $gte: today, $lt: tomorrow },
});

if(taskAssignedToday>=5){
  return res.status(400).json({msg:"You can't assign more than 5 tasks to a user in a day"})
}
console.log("count>>>",taskAssignedToday)


  const task = { title,
    dueDate,
    status,
    assignedBy: req.user.userId,
    assignedTo: assingtoData,
    remark,
   }
   console.log(">>>>>>task>>",task)
  const result = new taskData(task)

  const transporter = nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:587,
    auth:{
      user:'praveenkatewa.45@gmail.com',
      pass:'uhzy ezsr ynmg hsrt'
        // user:'uttamftspl@gmail.com',
        //         pass:'wlxj plim jsij fvzv'
   
    }
  })

  const MailInfo = await transporter.sendMail({
    from:'praveenkatewa.45@gmail.com',
    // to:assignedTo,
    to: assingtoData.email,
    subject:`Task ${title} assigned`,
    text:`Task ${title} assigned to you`

  })
  console.log("MailInfo>>>",MailInfo) 
  if(!MailInfo.messageId){
    return res.status(400).json({msg:"email not sent"})
  }


  await result.save()
  res.status(201).json({msg:"task given",result})
}

// exports.createTaskFromExcel = async(req, res) => {
//   try {
//       if (!req.files || !req.files.file) {
//            return res.status(400).json({ message: 'File is required' });
//               }

//       const jsonData = await excelFileRead(req.files.file)
//       console.log(jsonData);

//       for (const data of jsonData) {
//         console.log("data>>>",data)
//         console.log(">>>>user>>",req.user)
//           const { title, dueDate, assignedTo, remark } = data;
//           const assingtoData = await userData.findOne({ email: assignedTo });
//           if (!assingtoData) {
//               return res.status(400).json({message:"Assigned to user not found"})
//           }

//           const formattedDueDate = moment(new Date(Math.round((dueDate - 25569) * 86400 * 1000))).format('DD-MM-YYY');
//           console.log(">>>>formattedDueDate>>>",formattedDueDate)
//           const format = moment(formattedDueDate,'DD-MM-YYYY').format()
//           console.log(">>>>format>>>",format)
         
//           const assingBy = req.user.userId;
//           console.log(assingBy)
       
//           const task = new taskData({
//               title,
//               dueDate: format,
//               assignedTo: assingtoData._id,
//               remark,
//               assignedBy: assingBy
//           });
//           await task.save();
          
//       }

//       res.status(201).json({ message: 'Tasks created from Excel file' });
//   } catch (err) {
//       res.status(500).json({ message: 'Internal server error' });
//   }
// }



exports.createTaskFromExcel = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: "File is required" });
        }

        if (!req.user || !req.user.userId) {
            return res.status(400).json({ message: "User not authenticated" });
        }

        const jsonData = await excelFileRead(req.files.file);
        console.log(jsonData);

        for (const data of jsonData) {
            console.log("data>>>", data);
            console.log(">>>>user>>", req.user);

            const { title, dueDate, assignedTo, remark } = data;

            const assingtoData = await userData.findOne({ email: assignedTo });
            if (!assingtoData) {
                console.log(`Skipping task: User with email ${assignedTo} not found.`);
                continue; // Skip this task and move to the next
            }

            const formattedDueDate = moment(new Date(Math.round((dueDate - 25569) * 86400 * 1000)))
                .format("DD-MM-YYYY");
            console.log(">>>>formattedDueDate>>>", formattedDueDate);

            const format = moment(formattedDueDate, "DD-MM-YYYY").format();
            console.log(">>>>format>>>", format);

            const assignedBy = req.user.userId;
            console.log(assignedBy);

            const task = new taskData({
                title,
                dueDate: format,
                assignedTo: assingtoData._id,
                remark,
                assignedBy
            });
            await task.save();
        }

        res.status(201).json({ message: "Tasks created from Excel file" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};


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






// exports.createTaskFromExcel = async(req, res) => {
//   try {
//       const file = req.files.file;
//       const workbook = xlsx.read(file.data, { type: 'buffer' });
//       console.log('WORKBOOK >>>>',workbook);
//       const sheetName = workbook.SheetNames[0];
//       console.log("sheetname>>>>",sheetName);
//       const worksheet = workbook.Sheets[sheetName];
//       console.log("worksheet>>>",worksheet)
//       const jsonData = xlsx.utils.sheet_to_json(worksheet);
//       console.log('jsonData>>>',jsonData)
      
//       for (const data of jsonData) {
//           const { taskName, dueDate, assignTo, remark } = data;
//           const assingtoData = await userModel.findOne({ email: assignTo });
//           if (!assingtoData) {
//           return res.status(400).json({ message: `Assign to email ${assignTo} not found` });
//           }

//           const formattedDueDate = moment(new Date(Math.round((dueDate - 25569) * 86400 * 1000))).format('DD-MM-YYYY');
//           const assingBy = req.user._id;
          
//           const task = new taskModel({
//           taskName,
//           dueDate: formattedDueDate,
//           assignTo: assingtoData,
//           remark,
//           assingBy: assingBy
//           });

//           await task.save();
//       }

//       res.status(201).json({ message: 'Tasks created from Excel file' });
//   } catch (err) {
//       res.status(500).json({ message: 'Internal server error' });
//   }
// }


