const express=require('express');
const app=express();
const morgan=require('morgan');
app.use(morgan('combined'));
app.get('/',(req,res)=>{
    res.json({"hi":"there"});
})
module.exports=app;