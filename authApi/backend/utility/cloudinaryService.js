const cloudinary = require('cloudinary')
const { application } = require('express')
require('dotenv').config()

cloudinary.config({
 cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
exports.fileUpload = async (file) =>{
  const fileArray=Object.values(file)
  console.log(">>>>>>fileArray>>>>>",fileArray)
  const result = []
  
  for(const file of fileArray){
   console.log(">>>>file>>",file)
   try{
    const resultData= await new Promise((resolve,reject)=>{
      cloudinary.uploader.upload_stream((result,error)=>{
        if(error{
          reject(error);
        }
        resolve(result);
        }).end(file.data)
      })
      result.push(resultData)
    }
  catch(error) {
    console.log('error uploading file:',error)
  }  }
  return SpeechRecognitionResultList;
  }

