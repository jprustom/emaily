//Requiring Modules
const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth20');


//Requiring From other scripts
const keys=require('../configs/secrets.js');
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
    clientID:'854247420108-71uk3i5gep1s888oattv5rkcadnj8do7.apps.googleusercontent.com',
    clientSecret:keys.googleClientSecret,
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
