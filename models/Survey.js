const mongoose=require('mongoose');
const {Schema}=mongoose;
const sgMail = require('@sendgrid/mail');


require('../services/sendrid.js');


const recipientSchema = {
    responded: {
        type: Boolean,
        default: false
    },
    email: String
};
const surveySchema=new Schema({
    title:String,
    subject:String,
    body:String,
    yes:{
        type:Number,
        default:false
    },
    no:{
        type:Number,
        default:false
    },
    recipients:[recipientSchema],
    _user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    dateSent:Date,
    lastResponded:Date
})
surveySchema.statics.getUserSurveys=async function(userId){
    const userSurveys=await surveyModel
        .find({_user:userId})
        .select('-recipients -_user -_id -__v');
    return userSurveys;
}
surveySchema.statics.saveResponse=async function({surveyId,email,clickedChoice}){
    await surveyModel.findOneAndUpdate({
        _id:surveyId,
        recipients:{
            $elemMatch:{
                email,
                responded:false
            }
        }
    },{
        $inc:{
            [clickedChoice]:1
        },
        $set:{
            'recipients.$.responded':true,
        },
        lastResponded:Date.now()
    },{useFindAndModify:false}).exec();
    console.log(email+` responded with ${clickedChoice} for survey id ${surveyId}`);
}
surveySchema.methods.createMailTemplate=function(surveyToBeSaved){
    const {domain}=require('../configs.js');
    return `
        <body>
            <div style="text-align:center">
                <h3>I'd like your input!</h3>
                <p>Please answer:</p>
                <p>${this.body}</p>
                <div style="text-align:center">
                    <a href="${domain}/api/surveys/${surveyToBeSaved._id}/yes">Yes</a>
                </div>
                <div style="text-align:center">
                    <a href="${domain}/api/surveys/${surveyToBeSaved._id}/no">No</a>
                </div>
            </div>
        </body>
    `
}
async function sendToAllRecipients(next){
    const msg = {
        to: this.recipients,
        from: 'jprustom120@gmail.com',
        subject: this.subject,
        html: this.createMailTemplate(this)
    }
    try{
        await sgMail.send(msg);
        console.log(`sent ${this.title}`);
        next();
    }
    catch(err){
        err.message='While sending emails: '+err.message
        next(err);
    }
}
async function removeCreditFromUser(){
    const User=require('./User.js');
    const userId=this._user;
    const user=await User.findById(userId);
    user.credits--;
    await user.save();
}


surveySchema.pre('save',sendToAllRecipients)
surveySchema.post('save',removeCreditFromUser)


const surveyModel=mongoose.model('Survey',surveySchema);
module.exports=surveyModel;