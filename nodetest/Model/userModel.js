const mongoose = require('mongoose')

mongoose.connect(mongooseURL)
.then(()=>console.log(`>>>connect mongoose`))
.catch(err=>console.log(err))

const Schema=mongoose.Schema
const sales= new Schema({
  data:Schema.Types.Mixed
})
const sateData=mongoose.model('sales',sales)
