
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./router/UserRouter')


require('dotenv').config();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/std',router)


const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URL;

mongoose.connect(mongoUri)
.then(()=>{
  console.log('Connected to mongo')
}).catch((error)=>{
  console.log('Error in connection', error)
})

app.listen(port,()=>{
  console.log('Server is running on port', port)
})