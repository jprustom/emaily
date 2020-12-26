import React from 'react';

export default function SurveyField({meta:{error,touched},input,type,label}){
    return <React.Fragment>
        <label htmlFor={input.name}>{label}</label>
        <input style={{marginBottom:'5px'}} type={type} {...input}/>
        {touched && 
            (Array.isArray(error)
                ?error.map((error,i)=><p key={i} style={{marginBottom:'2rem',fontWeight:'bolder'}} className='red-text'>{error}</p>)
                :<p style={{marginBottom:'2rem',fontWeight:'bolder'}} className='red-text'>{error}</p>)}
    </React.Fragment>
}