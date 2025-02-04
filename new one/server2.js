const express=require('express')
const app = express()
const mongoose =require('mongoose')
const port = 5000

const mongoURL= 'mongodb://localhost:27017/market'
 


mongoose.connect(mongoURL)
.then(()=>console.log('mongoDB connected..'))
.catch(err=>console.log(err))

const Schema = mongoose.Schema
const sales= new Schema({
  data: Schema.Types.Mixed
})

const stateData= mongoose.model('sales',sales)
app.get('/findAll',async(req,res)=>{
  // console.log('>>>>req>>>',req);
    const result= await stateData.find()
    res.status(200).json(result) 

    console.log(`>>result`,result)
  }
)

app.get('/single/:id',async(req,res)=>{
  console.log('>>>>>>>',req.params);

  // const id=req.params.id
  const {id}=req.params
  
    // const result= await stateData.findById(id)
    const result= await stateData.findOne({_id:id})
    res.status(200).json(result) 

    console.log(`>>result`,result)
  }
)

app.delete('/remove/:id',async(req,res)=>{
  console.log('>>>>>>>',req.params);

  // const id=req.params.id
  const {id}=req.params
  
    // const result= await stateData.findById(id)
    const result= await stateData.findByIdAndDelete({_id:id})
    res.status(200).json(result) 

    console.log(`>>remove`,result)
  }
)


app.listen(port,()=>
  console.log(`server running on port ${port}`));




// http://localhost:5000/findAll