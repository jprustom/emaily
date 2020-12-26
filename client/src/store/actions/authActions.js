import axios from 'axios';
import {CHECK_AUTH} from './actionsTypes.js';


export function getUserAsync(){
    return async function(dispatch){
        const getUserResponse=await axios.get('/api/auth/user');
        const loggedInUser=getUserResponse.data;
        dispatch(getUser(loggedInUser));
        console.log(loggedInUser);
    }
}
function getUser(loggedInUser){
    return {
        loggedInUser,
        type:CHECK_AUTH
    }
}