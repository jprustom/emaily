import React,{useEffect} from 'react';
import {Route} from 'react-router';
import {useDispatch} from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';

import Header from './Header/Header.js';
import Landing from './Landing/Landing.js';
import CardPayment from './CardPayment/CardPayment.js';
import {getUserAsync} from '../../store/actions/authActions.js';


function NewSurvey(){
    return <h2>
        New Survey
    </h2>
}
function Dashboard(){
    return <h2>
        Dashboard
    </h2>
}
export default function App(props){
    const dispatch=useDispatch();
    useEffect(function(){
        dispatch(getUserAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return <React.Fragment>
        <Header/>
        <Route exact path="/"><Landing/></Route>
        <Route exact path="/surveys/new"><NewSurvey/></Route>
        <Route exact path="/surveys"><Dashboard/></Route>
        <Route exact path="/payment/checkout"><CardPayment/></Route>
    </React.Fragment>

}