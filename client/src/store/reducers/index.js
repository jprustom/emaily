import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import surveysReducer from './surveysReducer.js';
import authReducer from './authReducer.js';


const rootReducer=combineReducers({
    auth:authReducer,
    form:formReducer,
    surveys:surveysReducer
})


export default rootReducer;