const express=require('express')
const app = express()
const mongoose =require('mongoose')
const port = 6000

const mongoURL= 'mongodb://localhost:27017/Backend'

mongoose.connect(mongoURL)
.then(()=>console.log('mongoDB connected..'))
.catch(err=>console.log(err))

app.listen(port,()=>
  console.log(`server running on port ${port}`));