const express =require('express')

const app =express();

const mongoose=require('mongoose')
require('dotenv').config()
const router = require('./routes/routers') 
app.use(express.json());

const PORT =process.env.PORT || 5000;
const MONGOURL= process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(()=>{
  console.log(">>>database connect")
  app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
  })
}).catch((error)=>console.log(error));

app.use('/std',router)



