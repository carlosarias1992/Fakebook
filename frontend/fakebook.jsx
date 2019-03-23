import React from 'react';
import ReactDOM from 'react-dom';

//*** TESTING  ***/
import * as ApiUtil from './util/session_api_util';
//*** TESTING  ***/

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    //*** TESTING  ***/
    window.signup = ApiUtil.signup;
    window.login = ApiUtil.login;
    window.logout = ApiUtil.logout;
    //*** TESTING  ***/

    ReactDOM.render(<h1>Welcome to fakebook</h1>, root);
});