import ReactDOM from 'react-dom';
import React from 'react';
import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import thunk from 'redux-thunk';


import axios from 'axios';
import rootReducer from './store/reducers';
import App from './components/App/App.js';


window.axios=axios;


const store=createStore(rootReducer,applyMiddleware(thunk));
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));

