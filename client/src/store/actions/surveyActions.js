import {SUBMIT_SURVEY,FETCH_SURVEYS} from './actionsTypes.js';
import axios from 'axios';


function submitSurvey(postSurveyResponse){
    console.log(postSurveyResponse)
    return {
        type:SUBMIT_SURVEY,
        postSurveyResponse
    }
}
export function submitSurveyAsync(surveyFormValues,routerHistory){
    return async function(dispatch){
        try{
            const postSurveyResponse=await axios.post('/api/surveys',surveyFormValues);
            dispatch(submitSurvey(postSurveyResponse));
            routerHistory.push('/');
        }
        catch(err){
            console.log(err.response.data.err);
            //show modal
        }
    }
}

export function fetchUserSurveysAsync(){
    return async function(dispatch){
        const {data:userSurveys}=await axios.get('/api/surveys');
        console.log(userSurveys)
        dispatch(fetchUserSurveys(userSurveys))
    }
    
}
function fetchUserSurveys(userSurveys){
    return {
        type:FETCH_SURVEYS,
        userSurveys
    }
}