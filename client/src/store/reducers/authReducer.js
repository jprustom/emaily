import {CHECK_AUTH} from '../actions/acionsTypes.js';


const initialAuthReducerState=null;


export default function authReducer(authReducerState=initialAuthReducerState,authReducerAction){
    switch(authReducerAction.type){
        case CHECK_AUTH:
            return authReducerAction.loggedInUser || false; //'' is interpreted as falsey
        default:
            return authReducerState;
    }
}