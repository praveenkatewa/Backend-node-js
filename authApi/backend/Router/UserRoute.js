const express = require('express')
const router = express.Router()
const userController = require('../Controller/UserController')
const auth = require('../Middleware/auth')

router.post('/signup',userController.signUp)

router.post('/login',userController.login)


router.get('/findAll',auth,userController.findAll)

router.get('/getOne/:id',userController.getOne)

router.delete('/delete/:id',userController.delete)

router.patch('/update',userController.update)




router.post('/createemployee',auth,userController.createemployee)
router.get('/getemployee',userController.getemployee)
router.post('/add',userController.studentCreate)

router.post('/sendmail',userController.sendMail)
module.exports = router;