const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDB connection url
// const mongoURL = 'mongodb://127.0.0.1:27017/hotels'
const mongoURL = process.env.MONGODB_URL_GLOBAL
console.log('this is url:- ',mongoURL)

//Set up mongoDB connection
mongoose.connect(mongoURL)
//, {useNewUrlParser: true, useUnifiedTopology: true} no need to use these topology in new version.


//Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;

db.on('connected', ()=> {
    console.log('connected to mongoDb server')
})
db.on('error', (err)=> {
    console.log('MongoDB connection error: ', err)
})
db.on('disconnected', ()=> {
    console.log('Disconnected to mongoDb server')
})

module.exports= db;