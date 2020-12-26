function validateEmail(surveyRecipientsErrors,surveyRecipient){
    surveyRecipient=surveyRecipient.trim();
    const emailRegexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegexp.test(surveyRecipient.toLowerCase()))
        surveyRecipientsErrors.push(`Invalid email ${surveyRecipient}`)
}


module.exports={
    toCamelCase:function (str) { 
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) 
        { 
            return index === 0 ? word.toLowerCase() : word.toUpperCase(); 
        }).replace(/\s+/g, ''); 

    },
    validateEmails(surveyRecipients){
        const surveyRecipientsErrors=[];
        surveyRecipients=surveyRecipients.split(',').map(email=>email.trim()); //for eg ['joe@live.com','jp@live.com']
        surveyRecipients.forEach(function(surveyRecipient){
            validateEmail(surveyRecipientsErrors,surveyRecipient)
        });
        return surveyRecipientsErrors===[]
            ?undefined
            :surveyRecipientsErrors
    },
    surveyFormFields:[
        {
            surveyFormLabel:'Survey Title'
        },
        {
            surveyFormLabel:'Survey Subject'
        },
        {
            surveyFormLabel:'Survey Body'
        },
        {
            surveyFormLabel:'Survey Recipients'
        }
    ]
}