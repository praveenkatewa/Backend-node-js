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









// const express = require('express');
// const app = express();
// const port = 3000;

// // Middleware to parse JSON bodies
// app.use(express.json());

// // API endpoint to calculate the result
// app.post('/calculate', (req, res) => {
//   const { a, b, operator } = req.body;

//   let result;

//   switch (operator) {
//     case 'add':
//       result = a + b;
//       break;
//     case 'subtract':
//       result = a - b;
//       break;
//     case 'multiply':
//       result = a * b;
//       break;
//     case 'divide':
//       if (b !== 0) {
//         result = a / b;
//       } else {
//         return res.status(400).send('Error: Division by zero');
//       }
//       break;
//     default:
//       return res.status(400).send('Error: Invalid operator');
//   }

//   res.json({ result });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
