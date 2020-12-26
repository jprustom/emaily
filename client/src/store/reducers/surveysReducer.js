import {FETCH_SURVEYS} from '../actions/actionsTypes.js'

export default function surveyReducer(surveysState=[],surveyAction){
    switch(surveyAction.type){
        case FETCH_SURVEYS:
            return {userSurveys:surveyAction.userSurveys};
        default:
            return [];
    }
}