
const moment= require('moment');
function generateOTP(length = 6,expiryMinutes=5) {
  let otp = "";
  for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10); 
  }
  const expiryTime = moment().add(expiryMinutes, 'minutes').format("MMM DD, YYYY hh:mm A")
  return {otp,expiryTime};
}


// console.log(generateOTP());
module.exports =  generateOTP ;