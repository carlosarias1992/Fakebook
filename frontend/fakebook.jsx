import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

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

    ReactDOM.render(<Root store={store} />, root);
});