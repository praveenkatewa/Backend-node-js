const xlsx = require('xlsx')

exports.excelFileRead = async(file)=>{

          const workbook = xlsx.read(file.data, { type: 'buffer' });
       
          const sheetName = workbook.SheetNames[0];
        
          const worksheet = workbook.Sheets[sheetName];
         
          const jsonData = xlsx.utils.sheet_to_json(worksheet);
          console.log('jsonData>>>',jsonData)
          return jsonData;
}