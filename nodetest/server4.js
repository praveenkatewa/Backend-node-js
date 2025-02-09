const express= require('express')

const app = express ()



const port=process.env.PORT || 5000
require('dotenv').config()

const mongooseURL=process.env.MONGOURL

// mongoose.connect(mongooseURL)
// .then(()=>console.log(`>>>connect mongoose`))
// .catch(err=>console.log(err))

// const Schema=mongoose.Schema
// const sales= new Schema({
//   data:Schema.Types.Mixed
// })
// const sateData=mongoose.model('sales',sales)
app.get('/Findall',async(req,res)=>{
  
  const result=await sateData.find()
  res.status(200).json(result)
  console.log(`get data`,result)
})


// app.get('/Single/:id',async(req,res)=>{
//   const {id}=req.params
  
//   const result=await sateData.findOne({_id:id})
//   res.status(200).json(result)
//   console.log(`find one`,result)
// })




// app.delete('/Delete/:id',async(req,res)=>{
//   const {id}=req.params
  
//   const result=await sateData.findByIdAndDelete({_id:id})
//   res.status(200).json(result)
//   console.log(`delete one`,result)
// })





app.listen(port,()=>console.log(`connect server port ${port}`))













