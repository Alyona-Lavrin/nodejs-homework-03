const app = require('./app')
const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const DB_HOST = 'mongodb+srv://Alena:Alena123!@hw02.pnaqyil.mongodb.net/'

mongoose.connect(DB_HOST)
  .then(() => {
    console.log("Database connection successful");
    app.listen(3000);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1)
  })


  
// app.listen(3000, () => {
//   console.log("Server running. Use our API on port: 3000")
// })