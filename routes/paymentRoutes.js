//Requiring Modules
const express=require('express');
const paymentRouter = express.Router();
const axios=require('axios');


//Requiring From Other Scripts
const {tapSecretKey}=require('../configs/secrets.js');


paymentRouter.post('/charge',async function(req,res){
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
            "url": "https://www.google.com"
        }
        }
    try{
        const response=await axios.post('https://api.tap.company/v2/charges',chargeBody,{
            headers:{
            "Authorization":`Bearer ${tapSecretKey}`
        }
        });
        res.redirect('http://localhost:3000')
        console.log(response);
    }
    catch(err){
        console.log(err)
    }
    
})

module.exports=paymentRouter;