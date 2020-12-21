//Require express module
const express=require('express');
const bodyParser=require('body-parser');


const app=express();


//Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
if (process.env.NODE_ENV){
    app.use(express.static('client/build'));
    app.get('*',function(req,res){
        res.sendFile('client/build/index.html');
    })
}


//Requiring Routes
const authRoutes=require('./routes/authRoutes.js')
const paymentRoutes=require('./routes/paymentRoutes.js');


//Mapping Routes
app.use('/auth',authRoutes)
app.use('/payment',paymentRoutes);


//Default Route
app.get('/',function(req,res){
    res.send('hai')
})


module.exports=app;