const express=require('express');
const { Path } = require('path-parser');
const {URL}=require('url');
const _=require('lodash');


const hasEnoughCredits = require('../middlewares/hasEnoughCredits.js');
const isAuth = require('../middlewares/isLoggedIn.js');
const Survey=require('../models/Survey.js');
const isLoggedIn = require('../middlewares/isLoggedIn.js');


const surveysRouter=express.Router();


surveysRouter.get('',isLoggedIn,async (req,res)=>{
    const userSurveys=await Survey.getUserSurveys(req.user.id);
    res.send(userSurveys);
})
surveysRouter.get('/:surveyId/:clickedChoice',function(req,res){
    res.send('Thanks man :)')
});
surveysRouter.post('/webhooks',function(req,res){
    let webhooks=req.body;
    const pathNameSchema=new Path('/api/surveys/:surveyId/:clickedChoice');
    webhooks=webhooks.map(function(webhook){
        const {event,email,url: clickedURL}=webhook;
        if (event!='click')
            return undefined;
        const {pathname : clickedURLPathName}=new URL(clickedURL);
        const extractedClickedUrlPathNameParams=pathNameSchema.test(clickedURLPathName);
        if (!extractedClickedUrlPathNameParams)
            return undefined;
        const {surveyId,clickedChoice}=extractedClickedUrlPathNameParams;
        return {
            email,
            surveyId,
            clickedChoice
        } //extract only email, surveyId and clickedChoice of each webhook element
    }).filter(webhooks=>webhooks!=undefined); //remove undefined webhooks from webhooks array
    webhooks=_.uniqBy(webhooks,'email','surveyId'); //remove duplicate webhooks, if any
    webhooks.forEach(webhook=>Survey.saveResponse(webhook));
});
surveysRouter.get('/:surveyId/:choice',function(req,res){
    const choice=req.params.choice;
    if (choice!=='yes' && choice!=='no')
        throw new Error(`invalid choice ${choice}`)
});
surveysRouter.post('',isAuth,hasEnoughCredits,async function(req,res){
    try{
        console.log('submitting in backend')
        let {surveyTitle:title,surveySubject:subject,surveyBody:body,surveyRecipients:recipients}=req.body; //recipients=jp@live.com,jp@hotmail.com
        recipients=recipients.split(','); //recipients=['jp@live.com','jp@hotmail.com']
        recipients=recipients.map(recipient=>({ //recipients=[
            email:recipient.trim()                          //{email:'jp@live.com'},
        }))                                                //{email:'jp@hotmail.com'}]
        const createdSurvey=new Survey({
            title,
            subject,
            body,
            recipients,
            _user:req.user.id,
            dateSent:Date.now()
        })
        await createdSurvey.save();
        res.status(200).json({
            createdSurvey
        });
        
    }
    catch(err){
        err.message=err.message+' while posting survey'
        res.status(400).json({err:err.message})
    }
});


module.exports=surveysRouter