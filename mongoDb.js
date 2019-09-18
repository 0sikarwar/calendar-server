const mongoose = require('mongoose')
const uristring = `mongodb://127.0.0.1:27017/local`
const connectDB = () => {  
  mongoose.connect(uristring, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  const db = mongoose.connection;
  db.on('error',(err)=> {  
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  })
  db.once('open',()=>{
      console.log('Succeeded connected to: ' + uristring);
  })
}
module.exports = connectDB
