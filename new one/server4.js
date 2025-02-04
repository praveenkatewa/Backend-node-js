const express= require('express');
const mongoose= require('mongoose');
const app= express();
const MongoUrL="mongodb://localhost:27017/regex"
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

port =1000
mongoose.connect(MongoUrL)
    .then(()=>console.log("mongodb connect"))
    .catch(err=>console.log(err));
    const schema=mongoose.Schema
    const students=new schema({
      name:{
        type:String,
        required:true,
       },
       email:{
        type:String,
        required:true,
       },
       age:{
        type:String,
        required:false,
       },
       phone:{
        type:String,
        required:false,
       }
       
      
    }, {versionKey:false, timestamps:true}


)
    const statedata=mongoose.model('students',students)
    
    app.post('/studentCreate',async(req,res)=>{
        console.log('>>>>>>>>',req.body)
        const userdata = new statedata(req.body)
        console.log('>>>>>>>>userdata')
        await userdata.save()
          res.status(201).json(userdata)
          
    })

    app.get('/findall',async(req,res)=>{
        console.log('>>>>>>>>')
        const result=await statedata.find()
        console.log('>>>>>>>>',result)
        res.status(200).json(result)
    })

    app.get('/single/:id',async(req,res)=>{
        console.log('>>>>>>>>',req.params);
        const id=req.params.id
        const result=await statedata.findOne({_id:id});
        console.log('>>>>>>>>',result)
        res.status(200).json(result)
    });

    app.put('/recordupdate/:id',async(req,res)=>{
      console.log(`>>>>>>update`,req.body);
      const {id} =req.params
      // const id=req.body._id
      console.log(`>>>>id>>>`,id);

      const result= await statedata.findByIdAndUpdate(id,req.body)
      console.log(`>>>>>>>result>>`,result)
      res.status(200).json(result)

    })





    
    app.delete('/remove/:id',async(req,res)=>{
        console.log('>>>>>>>>',req.params);
        const id=req.params.id
        const result=await statedata.findByIdAndDelete({_id:id});
        console.log('>>>>>>>>',result)
        res.status(200).json(result)
    });
    
    
    app.listen(port,()=>{
        console.log(`Server is running on port ${port}`)
    })
















