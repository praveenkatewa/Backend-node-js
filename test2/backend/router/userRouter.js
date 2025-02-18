const express=require("express")
const router=express.Router()
const auth = require('../middleware/auth')

const userController=require("../Controller/userController")


router.post("/signup",userController.signup)
router.post("/login",userController.login)
router.post("/studentCreate",userController.studentCreate)
router.get('/findAll',userController.findAll)
module.exports=router