//Requiring Modules
const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');


//Requiring From other scripts
const {secrets}=require('../configs.js');
const{googleClientSecret,googleClientID}=secrets;
const User=require('../models/User.js');


//Middlewares
passport.serializeUser(function(user,done){
    done(null,user.id); //user.id is id stored in MongoDb
});
passport.deserializeUser(async function(userId,done){
    const loggedInUser=await User.findById(userId);
    done(null,loggedInUser);
});
passport.use(new GoogleStrategy({
    clientID:googleClientID,
    clientSecret:googleClientSecret,
    callbackURL:'/api/auth/google/callback'
},callBackFunctionOnSignIn));


//Helpers
async function callBackFunctionOnSignIn(accessToken,refreshToken,profile,done){
    console.log(profile);
    const googleId=profile.id;
    const existingUser=await User.findOne({googleId});
    if (existingUser){
        done(null,existingUser);
    }
    else{
        const newUserCreated=new User({googleId});
        await newUserCreated.save();
        done(null,newUserCreated);
        console.log('saved');
    }
}

module.exports=function(expressApp){
    const cookieSession=require('cookie-session');
    const {secrets}=require('../configs.js');
    const {cookieKey}=secrets;

    expressApp.use(cookieSession({ //Tell passport it has to use cookies to manage authentication
        maxAge:30*24*60*60*1000,
        keys:[cookieKey],
        name:'userSession'
    }))
    expressApp.use(passport.initialize());
    expressApp.use(passport.session()); //On deserialize, attach user to req (req.user)
}