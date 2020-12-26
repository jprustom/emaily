//Requiring modules
const app=require('express')();
const bodyParser=require('body-parser');


const configurePassport=require('./services/passport.js');


//Middlewares
configurePassport(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//Requiring Routes
const authRoutes=require('./routes/authRoutes.js')
const paymentRoutes=require('./routes/paymentRoutes.js');
const surveyRoutes=require('./routes/surveysRoutes.js');


//Mapping Routes
app.use('/api/auth',authRoutes);
app.use('/api/payment',paymentRoutes);
app.use('/api/surveys',surveyRoutes);
if (process.env.NODE_ENV=='production'){
    app.use(express.static('client/build'));
    app.get('*',function(req,res){ //or render a 404 page
        const path=require('path');      
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}


module.exports=app;