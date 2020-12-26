//Requiring Modules
const express=require('express');
const authRouter = express.Router();
const passport=require('passport');


//Handling Routes
authRouter.get('/google',passport.authenticate('google',{
    scope:['profile','email']
}))
authRouter.get('/google/callback',
    passport.authenticate('google'),
    function(req,res){
        res.redirect('/surveys')
        }
    );
authRouter.get('/logout',function (req,res){
    req.logout();
    res.redirect('/');
})
authRouter.get('/user',(req,res)=>{
    res.send(req.user)
})


//Export the router
module.exports=authRouter;