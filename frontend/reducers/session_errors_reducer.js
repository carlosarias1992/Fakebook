import { merge } from 'lodash';
import {
    RECEIVE_ERRORS,
    RECEIVE_CURRENT_USER,
    REMOVE_ERRORS
} from '../actions/session_actions';

export default (state = {}, action) => {
    const { errors } = action;
    const oldState = Object.freeze(state);
    let newState;

    switch (action.type) {
        case REMOVE_ERRORS: 
            newState = { errors: [] };
            return newState;
        case RECEIVE_ERRORS:
            newState = { errors };
            return merge({}, oldState, newState);
        case RECEIVE_CURRENT_USER:
            newState = { errors: [] };
            return newState;
        default:
            return state;
    }
};