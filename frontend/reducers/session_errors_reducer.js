import { merge } from 'lodash';
import {
    RECEIVE_ERRORS,
    RECEIVE_CURRENT_USER
} from '../actions/session_actions';

export default (state = {}, action) => {
    const { errors } = action;
    const oldState = Object.freeze(state);
    let newState;

    switch (action.type) {
        case RECEIVE_ERRORS:
            newState = { errors };
            return merge({}, oldState, newState);
        case RECEIVE_CURRENT_USER:
            newState = { errors: [] };
            return merge({}, oldState, newState);
        default:
            return state;
    }
};