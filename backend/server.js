const express = require("express");
const app = express();
const cors = require('cors')
require('dotenv').config() 

const connectToMongo = require('./db');
connectToMongo();

const port = 5000;

app.use(cors())
app.use(express.json())


// Available Routes
app.use('/api/auth',require('./routes/Auth.js'));
app.use('/api/teams',require('./routes/Team.js'));

app.listen(port,()=>{
    console.log(`Listening on the Port ${port}`)
})