import React from 'react';
import {useSelector,useDispatch} from 'react-redux';
import {surveyFormFields,toCamelCase} from '../../../../utils.js';
import {submitSurveyAsync} from '../../../../store/actions';
import { useHistory } from "react-router-dom";


export default function SurveyFormReview(props){
    const routerHistory=useHistory();
    const dispatch=useDispatch();
    const formValues=useSelector(state=>state.form.surveyForm.values);
    return <React.Fragment>
        <h5>Please Confirm Your Entries</h5>
        {
            surveyFormFields.map(function(surveyFormField,surveyFormIndex){
            const {surveyFormLabel}=surveyFormField; //for eg Survey Title
            const surveyFormName=toCamelCase(surveyFormLabel); //for eg surveyTitle
            return <React.Fragment key={surveyFormIndex}>
                <label>{surveyFormLabel}</label>
                <p>{formValues[surveyFormName]}</p>
            </React.Fragment>
            })
        
        }
        <button className="yellow white-text btn-flat" onClick={props.cancelSurveyFormSubmit}>
            Back
        </button>
        <button className="green white-text right btn-flat" onClick={()=>{dispatch(submitSurveyAsync(formValues,routerHistory));}}>
            Send Survey
            <i className="material-icons right">email</i>
        </button>
        </React.Fragment>
}