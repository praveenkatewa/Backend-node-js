const express =require('express')
const app =express()

 const mongoose =require('mongoose')
  const port=4000

  const mongoURL= 'mongodb://localhost:27017/market'

  mongoose.connect(mongoURL)
  .then(()=>console.log('mongoDB connected..'))
  .catch(err=>console.log(err))
  
  const Schema = mongoose.Schema
  const customers= new Schema({
    data: Schema.Types.Mixed
  })
  
  const stateData= mongoose.model('customers',customers)
  app.get('/findAll',async(req,res)=>{
      const result= await stateData.find()
      res.status(200).json(result) 
  
      console.log(`>>result`,result)
    }
  )
  
  app.listen(port,()=>
    console.log(`server running on port ${port}`));