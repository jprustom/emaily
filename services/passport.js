//Requiring Modules
const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');


//Requiring From other scripts
const {googleClientID,googleClientSecret}=require('../configs/secrets.js');
const User=require('../models/User.js');


//Middlewares
passport.serializeUser(function(user,done){
    done(null,user.id); //user.id is id stored in MongoDb
});
passport.deserializeUser(async function(userId,done){
    const loggedInUser=await User.findById(userId);
    done(null,loggedInUser);
});
console.log(googleClientID);
console.log('secret is',googleClientSecret)
passport.use(new GoogleStrategy({
    clientID:googleClientID,
    clientSecret:googleClientSecret,
    callbackURL:'/auth/google/callback'
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
