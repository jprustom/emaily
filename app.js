const express=require('express');
const app=express();
app.get('/',(req,res)=>{
    res.json({"hi":"there"});
})
exports.default=app;