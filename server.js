const express = require('express')
const app = express();
const db = require('./db')
require('dotenv').config();


const bodyParser = require('body-parser');
app.use(bodyParser.json());// req.body
const PORT = process.env.PORT || 3000;


//imports the router file
const personRoutes = require('./routes/userRoutes')
const candidateRoutes = require('./routes/candidateRoutes')

//use the routers
app.use('/user', personRoutes)
app.use('/candidate',candidateRoutes)

app.listen(PORT, ()=>{
    console.log('Server is listening on port 3000')
})