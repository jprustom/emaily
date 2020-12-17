//Requiring Modules
const express=require('express');
const authRouter = express.Router();
const cookieSession=require('cookie-session');
const passport=require('passport');

//Requiring from other scripts
const {cookieKey}=require('../configs/secrets.js');


//Routes Middlewares
authRouter.use(cookieSession({ //Tell passport it has to use cookies to manage authentication
    maxAge:30*24*60*60*1000,
    keys:[cookieKey],
    name:'userSession'
}))
authRouter.use(passport.initialize());
authRouter.use(passport.session()); //On deserialize, attach user to req (req.user)
require('../services/passport.js');


//Handling Routes
authRouter.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}))
authRouter.get('/google/callback',passport.authenticate('google'),(req,res)=>{res.send('hi')})
authRouter.get('/logout',(req,res)=>{res.send(req.logout());})
authRouter.get('/user',(req,res)=>{res.send(req.user)})


//Export the router
module.exports=authRouter;