import { merge } from 'lodash';
import { 
    RECEIVE_CURRENT_USER,
    LOGOUT_CURRENT_USER
} from '../actions/session_actions';

const _nullSession = {
    currentUserId: null
};

export default (state = _nullSession, action) => {
    const { user } = action;
    const oldState = Object.freeze(state);
    let newState;

    switch(action.type) {
        case RECEIVE_CURRENT_USER: 
            newState = { currentUserId: user.id };
            return merge({}, oldState, newState);
        case LOGOUT_CURRENT_USER:
            newState = _nullSession;
            return merge({}, oldState, newState);
        default: 
            return state;
    }
};