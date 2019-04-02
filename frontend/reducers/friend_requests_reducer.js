import { merge } from 'lodash';
import {
    RECEIVE_FRIEND_REQUEST,
    RECEIVE_FRIEND_REQUESTS,
    REMOVE_FRIEND_REQUEST
} from '../actions/friend_request_actions';
import { LOGOUT_CURRENT_USER } from '../actions/session_actions';
import { removeObject } from '../util/reducer_util';

export default (state = {}, action) => {
    const oldState = Object.freeze(state);
    let newState;

    switch(action.type) {
        case RECEIVE_FRIEND_REQUEST:
            newState = action.request;
            return merge({}, oldState, newState);
        case RECEIVE_FRIEND_REQUESTS: 
            return action.requests;
        case LOGOUT_CURRENT_USER:
            return {};
        case REMOVE_FRIEND_REQUEST:
            return removeObject(action.friendRequestId, oldState);
        default: 
            return oldState;
    }
};