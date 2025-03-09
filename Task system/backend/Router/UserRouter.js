const express = require('express');
const router = express.Router();
const UserController= require('../Controller/UserController');
const { auth } = require('../Middleware/AuthMiddleware');
const TaskController = require('../Controller/TaskController');



router.post('/register', UserController. register);
router.post('/login',UserController.login);

router.get('/getuser',TaskController.getuser);

router.put('/updatePassword',auth,UserController.updatePassword);

router.post('/forgotPassword',UserController.forgotPassword);


router.post('/createTask',auth,TaskController.createTask);

router.get('/myTasks',auth,TaskController.myTasks);


router.get('/myAssignedTasks',auth,TaskController.myAssignedTasks);

router.put('/:id', auth,TaskController. updateTask);  
router.delete('/:id', auth,TaskController. deleteTask);  





router.delete('/completetask/:id', auth, TaskController.completeTask);



router.get('/trash', auth, TaskController.getTrashTasks); // Get trashed tasks

router.put('/restore/:id', auth, TaskController.restoreTask); // Restore task
// router.get('/completedTask/:id',auth,TaskController.myCompelteTask)

router.post('/getOtp',UserController.getOtp);

module.exports = router;



