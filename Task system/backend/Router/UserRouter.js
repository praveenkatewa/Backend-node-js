const express = require('express');
const router = express.Router();
const { register, login } = require('../Controller/UserController');
const { auth } = require('../Middleware/AuthMiddleware');
const {createTask,getTasks,updateTask} = require('../Controller/TaskController');

// router.use(auth);

router.post('/register', register);
router.post('/login', login);



// router.post('/createTask', authorize('admin', 'team_lead'), createTask);
// router.get('/getTasks', getTasks);
// router.put('/updateTask', updateTask);

module.exports = router;