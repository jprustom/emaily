/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch,useSelector} from 'react-redux';
import {fetchUserSurveysAsync} from '../../../store/actions/surveyActions';


export default function Dashboard(){
    const dispatch=useDispatch();
    const userSurveys=useSelector(function({surveys:{userSurveys}}){
        return userSurveys
    });
    useEffect(()=>{
        dispatch(fetchUserSurveysAsync())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    console.log(userSurveys)
    return <div>
        {
                userSurveys
                    &&
                userSurveys.reverse().map((userSurvey,i)=>{
                const {title,dateSent,subject,body,yes,no}=userSurvey;
                return <div className="card darken-1" key={i}>
                    <div className="card-content">
                        <span className="card-title">
                            {title}
                        </span>
                        <p>
                            {body}
                        </p>
                        <p className="right">
                            Sent on {new Date(dateSent).toLocaleDateString()}
                        </p>
                        <div className="card-action">
                            <a>Yes: {yes}</a>
                            <a>No: {no}</a>
                        </div>
                    </div>
                </div>
            })
        }
        <div className="fixed-action-btn">
            <Link to="/surveys/new" className="btn-floating btn-large red">
                <i className="material-icons">add</i>
            </Link>
        </div>
    </div>
}