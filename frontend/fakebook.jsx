import React from 'react';
import ReactDOM from 'react-dom';

//*** TESTING  ***/
import * as ApiUtil from './util/session_api_util';
import configureStore from './store/store';
//*** TESTING  ***/

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    
    //*** TESTING  ***/
    const store = configureStore();
    window.getState = store.getState;
    window.dipatch = store.dispatch;
    window.signup = ApiUtil.signup;
    window.login = ApiUtil.login;
    window.logout = ApiUtil.logout;
    //*** TESTING  ***/

    ReactDOM.render(<h1>Welcome to fakebook</h1>, root);
});