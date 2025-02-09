const express=require('express')
const router=express.Router()
const userController=require('../Controller/userController')

router.get('/add',userController)

module.exports=router;
