import { merge } from 'lodash';
import {
    RECEIVE_CURRENT_USER
} from '../actions/session_actions';

export default (state = {}, action) => {
    const { user } = action;
    const oldState = Object.freeze(state);
    let newState;

    switch(action.type) {
        case RECEIVE_CURRENT_USER:
            newState = { [user.id]: user };
            return merge({}, oldState, newState);
        default: 
            return state;
    }
};