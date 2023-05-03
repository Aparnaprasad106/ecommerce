// automatically load env file to our app
require('dotenv').config()

// import express
const express = require('express')
// import cors
const cors=require('cors')
// import connection file
require('./db/connection')
// import router
const router = require('./routes/router')

// create server application
const server = express()

// to hold port number
const PORT = 3000 ||process.env.PORT
// use in server app
server.use(cors())
server.use(express.json())
server.use(router)

// route
server.get('/',(req,res)=>{
    res.send('Ecart server started!!!')
})

// run app
server.listen(PORT,()=>{
    console.log(`Ecart server started at port ${PORT}`);
})