import React from 'react';
import SpinnerClasses from './Spinner.module.css';


export default function Spinner(){
    return <div class={SpinnerClasses.loader}>Loading...</div>;
}