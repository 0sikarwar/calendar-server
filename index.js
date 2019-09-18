const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const router = require('./routes')

const app = express();
const PORT = 5003;
const connectDB = require('./mongoDb')


connectDB();
app.use(bodyParser.json());
app.use(cors())
app.use(router)

app.listen(PORT, () => {
  console.log('Server is runing at: ', PORT);
});