import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

//*** TESTING  ***/
import * as ApiUtil from './util/session_api_util';
import * as Actions from './actions/session_actions';
//*** TESTING  ***/

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');

    let savedSession;
    if (window.currentUser) {
        savedSession = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { current_user_id: window.currentUser.id }
        };
    } else {
        savedSession = {};
    }

    const store = configureStore(savedSession);
    
    //*** TESTING  ***/
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.signupUser = ApiUtil.signupUser;
    window.loginUser = ApiUtil.loginUser;
    window.logoutUser = ApiUtil.logoutUser;
    window.logout = Actions.logout;
    window.login = Actions.login;
    //*** TESTING  ***/

    ReactDOM.render(<Root store={store} />, root);
});