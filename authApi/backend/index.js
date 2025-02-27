const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./Router/UserRoute')


require('dotenv').config();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use('/std',router)



const port = process.env.PORT || 5080;
const mongoUri = process.env.MONGO_URL;

mongoose.connect(mongoUri)
.then(()=>{
  console.log('Connected to mongo')
}).catch((error)=>{
  console.log('Error in connection', error)
})


// const transporter = nodemailer.createTransport({
//   // service:'gmail',
//   host: 'gmail',
//   auth:{
//     user:process.env.Email_User,
//     pass:process.env.Email_password
//   }
// });

// const mailOption = {
//   from:process.env.Email_User,
//   to:process.env.Email_TO,
//   subject:'Sending Email using Node.js',
//   text:'That was easy!'
// };

// async function sendEmail (){
//   const sendMail =  await transporter.sendMail(mailOption)
//   console.log(`>>>>>>>>>>sendMail`,sendMail);
// }
// sendEmail()


app.listen(port,()=>{
  console.log('Server is running on port', port)
})