const express= require('express');
const app= express();
const port = 5000
const moment=require('moment');

app.use(express.json());
app.post('/cal', (req, res) => {
  const { a, b, operator } = req.body;
  let  result=0 ;

  if (operator === '+') {
    res.json({ result: a + b });
  } else if (operator === '-') {
    res.json({ result: a - b });
  } else if (operator === '*') {
    res.json({ result: a * b });
  } else if (operator === '/') {
    res.json({ result: a / b });
  } else {
    res.json({ message: 'Invalid operator' });
  }
       return  res.status(201).send('Error: Invalid operator');
});




app.post('/age', (req, res) => {
  const {dob} = req.body; 
  const today=moment()
  const age= today.diff(dob,'weeks')
  console.log(age)

  res.status(201).json({ age: age });
});

app.listen(port,()=>
  console.log(`server running on port ${port}`));