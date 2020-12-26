import React from 'react';
import {reduxForm,Field} from 'redux-form';
import {Link} from 'react-router-dom';


import {surveyFormFields,toCamelCase,validateEmails} from '../../../../utils.js';
import SurveyField from './SurveyField/SurveyField.js';


class SurveyForm extends React.Component{
    renderSurveyFormFields(){
        return surveyFormFields.map(function(surveyFormField,surveyFormIndex){
            const {surveyFormLabel}=surveyFormField;
            const surveyFormName=toCamelCase(surveyFormLabel);
            return <Field key={surveyFormIndex} label={surveyFormLabel} name={surveyFormName} type="text" component={SurveyField}/>
        
        })
    }
    render(){
        return <form onSubmit={this.props.onSurveyFormSubmit}>
            {this.renderSurveyFormFields()}
            <Link to="/surveys" className="red btn-flat white-text">Cancel</Link>
            <button className="teal btn-flat right white-text" type="submit">
                Next
                <i className="material-icons right">done</i>
            </button>
        </form>
    }
}

function validate(values){
    const errors={};
    const {surveyTitle,surveySubject,surveyBody,surveyRecipients}=values;
    if (!surveyTitle)
        errors.surveyTitle='You must provide a title';
    if (!surveySubject)
        errors.surveySubject='You must provide a subject';
    if (!surveyBody)
        errors.surveyBody='You must provide a body';
    if (!surveyRecipients)
        errors.surveyRecipients='You must provide recipients';
    else errors.surveyRecipients=validateEmails(surveyRecipients)
    return errors;
}
export default reduxForm({
    validate,
    form:'surveyForm',
    destroyOnUnmount:false
})(SurveyForm)