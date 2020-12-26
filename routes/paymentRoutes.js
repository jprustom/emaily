//Requiring Modules
const express=require('express');
const paymentRouter = express.Router();
const axios=require('axios');


//Requiring From Other Scripts
const {secrets,tapChargeApiEndpoint,domain}=require('../configs.js');
const {tapSecretKey}=secrets;
const isLoggedIn = require('../middlewares/isLoggedIn.js');


paymentRouter.post('/charge',isLoggedIn,async function(req,res){
    const chargeBody={
        "amount": 5,
        "currency": "USD",
        "description": "Buy 5 Credits",
        "receipt": {
            "email": true,
            "sms": true
        },
        "customer": {
            "first_name": "Jean-Paul",
            "last_name": "Rustom",
            "email": "jeanpaul.r_1999@live.com",
            "phone": {
            "country_code": "961",
            "number": "79153043"
            }
        },
        "merchant": {
            "id": ""
        },
        "source": {
            "id": req.body.tapToken
        },
        
        "redirect": {
            "url": domain //not working 
        }
        }
    try{
        const response=await axios.post(tapChargeApiEndpoint,chargeBody,{
            headers:{
            "Authorization":`Bearer ${tapSecretKey}`
        }
        });
        res.redirect(domain)
        console.log(response);
    }
    catch(err){
        console.log(err)
    }
    
})

module.exports=paymentRouter;