require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const app = express();
app.use(express.json())
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1); });



const authRoute=require('./routes/authRoute')
const adminRoute=require('./routes/adminRoute')
app.use('/api',authRoute)
app.use('/api/admin',adminRoute)



const port = 3000;


  app.listen(port, () => {
  console.log('Server is running on Port:', port);
});
