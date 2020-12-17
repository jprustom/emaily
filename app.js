//Require express module
const express=require('express');

const keys=require('./configs/secrets.js');
const app=express();


//Requiring Routes
// const authRoutes=require('./routes/authRoutes.js')


//Mapping Routes
// app.use('/auth',authRoutes)


//Default Route
app.get('/',function(req,res){
    res.send(keys)
})


module.exports=app;