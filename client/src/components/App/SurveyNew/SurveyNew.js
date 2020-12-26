import React,{useState} from 'react';
import SurveyForm from './SurveyForm/SurveyForm.js';
import SurveyFormReview from './SurveyFormReview/SurveyFormReview.js';

export default function SurveyNew(){
    const [showSurveyFormReview,setShowSurveyFormReview]=useState(false);
    return showSurveyFormReview
        ?<SurveyFormReview cancelSurveyFormSubmit={setShowSurveyFormReview.bind(this,false)}/>
        :<SurveyForm onSurveyFormSubmit={setShowSurveyFormReview.bind(this,true)}/>
}