require("dotenv").config();
const mongoose = require("mongoose");
const app = require('./app');
const PORT = process.env.PORT;

const http = require('http').createServer(app);

mongoose.connect('mongodb://localhost:27017/tourApp')
    .then(_ => console.log('MongoDB connected'))
    .catch(err => console.log(err))

http.listen(PORT, _ => console.log(`server is running on port ${PORT}`));