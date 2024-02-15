/*
used mulitple middlewears
like express router and morgan to log the HTTP reqeust
File created on 10th Feb 2024 By Madhu Kumar K S
*/

const express = require('express');
const app = express();
const movieRouter = require('./Routes/routes')
const authRouter = require('./Routes/authRouter')
const morgan = require("morgan");

app.use(morgan('combined'));

app.use('/',movieRouter);
app.use('/users', authRouter)

// Defult error handler 
app.all('*',(req,res,next)=>{
  res.status(404).json({
    status: "Failure",
    message: `Can't find ${req.originalUrl} on the server.`
  })
})

// Global Error handling middlewear
app.use((error, req,res,next)=>{
  error.statuscode = error.statuscode || 500;
  error.status = error.status || 'error';
  res.status(error.statuscode).json({
    status: error.statuscode,
    message: error.message
  })
})

module.exports = app;