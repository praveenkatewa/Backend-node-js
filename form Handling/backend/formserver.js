const express = require('express');
const mongoose = require('mongoose');

const app = express();
const MongoUrL = "mongodb://localhost:27017/form"; 
const port = 6080;
const cors = require('cors');



app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cors());
mongoose.connect(MongoUrL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error: ", err));

 const schema=mongoose.Schema

  const Form = new schema({
    name: String,
    email: String,
    password: String,
    gender: String,
    city: String,
    age: Number,
  },{versionKey:false, timestamps:true});

  const stateForm=mongoose.model('Form', Form);  


  // app.use('/form',stateForm)
app.post('/Form', async (req, res) => {

  console.log('>>>>',req.body)
  
    const formData = new stateForm(req.body);

    console.log(">>>>>>formData>>>")

    await formData.save(); 
    console.log(">>>>save>>")
    res.status(200).send({ message: 'Data saved successfully!' });
  
});



  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });