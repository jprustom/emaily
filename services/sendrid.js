const sgMail = require('@sendgrid/mail')

const {secrets}=require('../configs.js');
const {sendGridKey}=secrets;


sgMail.setApiKey(sendGridKey);