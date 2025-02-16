const express = require('express')
const router = express.Router()
const userController = require('../Controller/UserController')
const auth = require('../Middleware/auth')

router.post('/signup',userController.signUp)

router.post('/login',userController.login)


router.get('/findAll',userController.findAll)

router.get('/getOne/:id',userController.getOne)

router.delete('/delete/:id',userController.delete)

router.patch('/update',userController.update)




router.post('/add',userController.studentCreate)
module.exports = router;