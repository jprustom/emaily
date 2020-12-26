import React,{useEffect} from 'react';
import {Route} from 'react-router';
import {useDispatch} from 'react-redux';
import 'materialize-css/dist/css/materialize.min.css';

import Header from './Header/Header.js';
import Landing from './Landing/Landing.js';
import Dashboard from './Dashboard/Dashboard.js';
import CardPayment from './CardPayment/CardPayment.js';
import {getUserAsync} from '../../store/actions/authActions.js';
import SurveyNew from './SurveyNew/SurveyNew.js';


export default function App(props){
    const dispatch=useDispatch();
    useEffect(function(){
        dispatch(getUserAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    return <React.Fragment>
        <Header/>
        <div className="container">
            <Route exact path="/"><Landing/></Route>
            <Route exact path="/surveys/new"><SurveyNew/></Route>
            <Route exact path="/surveys"><Dashboard/></Route>
            <Route exact path="/api/payment/checkout"><CardPayment/></Route>
        </div>
    </React.Fragment>

}