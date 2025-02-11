const express = require('express')
const router = express.Router()
const userController = require('../controller/userController')

router.post('/singup',userController.signUp)
router.get('/login',userController.login)




module.exports = router