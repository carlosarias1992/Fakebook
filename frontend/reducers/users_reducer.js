import { merge } from 'lodash';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import {
    RECEIVE_USERS,
    RECEIVE_USER
} from '../actions/user_actions';

export default (state = {}, action) => {
    const { user } = action;
    const oldState = Object.freeze(state);
    let newState;

    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            newState = { [user.id]: user };
            return merge({}, oldState, newState);
        case RECEIVE_USERS:
            newState = action.users;
            return merge({}, oldState, newState);
        case RECEIVE_USER:
            newState = { [user.id]: user };
            return merge({}, oldState, newState);
        default: 
            return state;
    }
};