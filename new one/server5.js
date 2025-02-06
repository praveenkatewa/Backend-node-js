const express= require('express');
const app= express();
const port = 5000
const moment=require('moment');

app.use(express.json());

app.post('/age', (req, res) => {
  const {dob} = req.body.dob; 
  const today=moment()
  const age= today.diff(dob,'years')
  

  res.json({ age: age });
});


app.listen(port,()=>
  console.log(`server running on port ${port}`));